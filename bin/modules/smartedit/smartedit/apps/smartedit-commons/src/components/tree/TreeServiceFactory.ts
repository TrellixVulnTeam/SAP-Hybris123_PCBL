/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IRestService, IRestServiceFactory } from 'smarteditcommons/services';
import { ITreeService, TreeNode } from './types';

/* @internal */
export const TreeServiceFactory = (
    $q: angular.IQService,
    restServiceFactory: IRestServiceFactory,
    getDataFromResponse: (response: any) => any
): any => {
    'ngInject';

    /**
     * A class to manage tree nodes through a REST API.
     * @param nodeUri the REST entry point to handle tree nodes. it must support GET, POST, PUT and DELETE verbs:
     * - GET nodeUri?parentUid={parentUid} will return a list of children `TreeNode` nodes wrapped in an object:
     *
     * ### Example
     *      {
     *      	 navigationNodes:[{
     *      		 uid: "2",
     *      		 name: "node2",
     *      		 parentUid: "root"
     *      		 hasChildren: true
     *      	 }, {
     *      		 uid: "4",
     *      		 name: "node4",
     *      		 parentUid: "1",
     *      		 hasChildren: false
     *      	 }]
     *      }
     *
     * - POST nodeUri takes a `TreeNode` payload and returns the final object.
     * - PUT nodeUri/{uid} takes a `TreeNode` payload and returns the final object.
     * - DELETE nodeUri/{uid}
     */
    return class implements ITreeService {
        public nodesRestService: IRestService<TreeNode | TreeNode[]>;

        constructor(nodeUri: string) {
            if (nodeUri) {
                this.nodesRestService = restServiceFactory.get(nodeUri);
            }
        }

        /**
         * Will fetch the children of a given node by querying GET nodeUri?parentUid={parentUid}
         * - Once the children retrieved, the node will be marked as "initiated" and subsequent calls will not hit the server.
         * - Each children will be given a ManyToOne reference to their parent.
         * - The parent nodes will be assigned its children through the "nodes" property.
         * @param parent the parent `TreeNode` object the nodes of which we want to fetch
         */
        fetchChildren(_parent: TreeNode): angular.IPromise<TreeNode[]> {
            _parent.nodes = _parent.nodes || [];
            if (_parent.initiated) {
                return $q.when(_parent.nodes);
            } else {
                return $q
                    .when(
                        this.nodesRestService.get({
                            parentUid: _parent.uid
                        })
                    )
                    .then((response: TreeNode[]) => {
                        _parent.initiated = true;

                        const children = getDataFromResponse(response);

                        if (!children) {
                            return [];
                        }

                        children.forEach((child: TreeNode) => {
                            child.parent = _parent;
                        });

                        Array.prototype.push.apply(_parent.nodes, children);
                        return children;
                    });
            }
        }

        /**
         * Will save a new node for the given parent by POSTing to nodeUri. The payload will only contain the parentUid and a generated name.
         * On the front end side the parent model will be marked as having children.
         * @param parent the parent `TreeNode` object from which to create a child
         */
        saveNode(_parent: TreeNode): angular.IPromise<TreeNode> {
            return $q
                .when(
                    this.nodesRestService.save({
                        parentUid: _parent.uid,
                        name: (_parent.name ? _parent.name : _parent.uid) + _parent.nodes.length
                    })
                )
                .then((response: TreeNode) => {
                    _parent.hasChildren = true;
                    response.parent = _parent;
                    return response;
                });
        }
        /**
         * Will delete a node by sending DELETE to nodeUri/{uid}.
         * On the front end side the parent model "hasChildren" will be re-evaluated.
         * @param node the `TreeNode` object to delete.
         */
        removeNode(node: TreeNode): angular.IPromise<void> {
            return $q
                .when(
                    this.nodesRestService.remove({
                        identifier: node.uid
                    })
                )
                .then(function () {
                    const parent = node.parent;
                    parent.hasChildren = parent.nodes.length > 1;
                    return;
                });
        }
    };
};
