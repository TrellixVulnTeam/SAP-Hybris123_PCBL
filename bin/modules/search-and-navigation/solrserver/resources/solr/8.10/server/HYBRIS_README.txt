
hybris Changes
=============================

This is a modified version of Solr.

The following files/directories were removed:
- docs
- example
- dist/test-framework
- dist/solr-test-framework-8.10.1.jar
- server/solr-webapp/webapp/WEB-INF/lib/htrace-core4-4.1.0-incubating.jar

The following files/directories were added:
- HYBRIS_README.txt
- contrib/hybris
- server/solr/security.json.example
- server/solr/solr.p12
- server/solr/solr_client.p12

The following files/directories were modified/replaced:
- bin/solr.cmd:
	- workaround for https://issues.apache.org/jira/browse/SOLR-7283 (lines 19-20)
- bin/solr.in.cmd:
	- authentication and ssl configuration example (lines 210-229)
	- remove UseLargePages parameter from GC_TUNE parameters due to problems with running solr within docker container (line 231)
- bin/solr.in.sh:
	- authentication and ssl configuration example (lines 251-270)
	- remove UseLargePages parameter from GC_TUNE parameters due to problems with running solr within docker container (line 272)
- server/solr/solr.xml
- server/solr/configsets
- guava library (due to https://nvd.nist.gov/vuln/detail/CVE-2020-8908)
    - licenses/guava-25.1-jre.jar.sha1 -> licenses/guava-30.0-jre.jar.sha1
    - server/solr-webapp/webapp/WEB-INF/lib/guava-25.1-jre.jar -> server/solr-webapp/webapp/WEB-INF/lib/guava-30.0-jre.jar
- failureaccess-1.0.1 (due to https://issues.apache.org/jira/browse/SOLR-15090 which will be fixed for solr 9.0.0)
		- added licenses/failureaccess-1.0.1.jar.sha1
		- added licenses/failureaccess-LICENSE-ASL.txt
		- added licenses/licenses/failureaccess-NOTICE.txt
		- added server/solr-webapp/webapp/WEB-INF/lib/failureaccess-1.0.1.jar
- libthrift library (due to https://nvd.nist.gov/vuln/detail/CVE-2020-13949)
    - licenses/libthrift-0.13.0.jar.sha1 -> licenses/libthrift-0.14.0.jar.sha1
  	- contrib/jaegertracer-configurator/lib/libthrift-0.13.0.jar -> contrib/jaegertracer-configurator/lib/libthrift-0.14.0.jar
- log4j (due to https://nvd.nist.gov/vuln/detail/CVE-2021-44228, https://nvd.nist.gov/vuln/detail/CVE-2021-45046)
		- licenses/log4j-1.2-api-2.14.1.jar.sha1 -> licenses/log4j-1.2-api-2.16.0.jar.sha1
		- server/lib/ext/log4j-1.2-api-2.14.1.jar -> server/lib/ext/log4j-1.2-api-2.16.0.jar
		- licenses/log4j-api-2.14.1.jar.sha1 -> licenses/log4j-api-2.16.0.jar.sha1
		- server/lib/ext/log4j-api-2.14.1.jar -> server/lib/ext/log4j-api-2.16.0.jar
		- contrib/prometheus-exporter/lib/log4j-api-2.14.1.jar -> contrib/prometheus-exporter/lib/log4j-api-2.16.0.jar
		- licenses/log4j-core-2.14.1.jar.sha1 -> licenses/log4j-core-2.16.0.jar.sha1
		- server/lib/ext/log4j-core-2.14.1.jar -> server/lib/ext/log4j-core-2.16.0.jar
		- contrib/prometheus-exporter/lib/log4j-core-2.14.1.jar -> contrib/prometheus-exporter/lib/log4j-core-2.16.0.jar
		- licenses/log4j-layout-template-json-2.14.1.jar.sha1 -> licenses/log4j-layout-template-json-2.16.0.jar.sha1
		- server/lib/ext/log4j-layout-template-json-2.14.1.jar -> server/lib/ext/log4j-layout-template-json-2.16.0.jar
		- licenses/log4j-slf4j-impl-2.14.1.jar.sha1 -> licenses/log4j-slf4j-impl-2.16.0.jar.sha1
		- server/lib/ext/log4j-slf4j-impl-2.14.1.jar -> server/lib/ext/log4j-slf4j-impl-2.16.0.jar
		- contrib/prometheus-exporter/lib/log4j-slf4j-impl-2.14.1.jar -> contrib/prometheus-exporter/lib/log4j-slf4j-impl-2.16.0.jar
		- licenses/log4j-web-2.14.1.jar.sha1 -> licenses/log4j-web-2.16.0.jar.sha1
		- server/lib/ext/log4j-web-2.14.1.jar -> server/lib/ext/log4j-web-2.16.0.jar
- velocity-engine-core library (due to https://nvd.nist.gov/vuln/detail/CVE-2020-13936)
		- licenses/velocity-engine-core-2.0.jar.sha1 -> licenses/velocity-engine-core-2.3.jar.sha1
		- contrib/velocity/lib/velocity-engine-core-2.0.jar -> contrib/velocity/lib/velocity-engine-core-2.3.jar
- velocity-tools(due to https://nvd.nist.gov/vuln/detail/CVE-2020-13959)
    - licenses/velocity-tools-view-jsp-3.0.jar.sha1 -> licenses/velocity-tools-view-jsp-3.1.jar.sha1
    - contrib/velocity/lib/velocity-tools-view-jsp-3.0.jar -> contrib/velocity/lib/velocity-tools-view-jsp-3.1.jar
    - licenses/velocity-tools-view-3.0.jar.sha1 -> licenses/velocity-tools-view-3.1.jar.sha1
    - contrib/velocity/lib/velocity-tools-view-3.0.jar -> contrib/velocity/lib/velocity-tools-view-3.1.jar
    - licenses/velocity-tools-generic-3.0.jar.sha1 -> licenses/velocity-tools-generic-3.1.jar.sha1
    - contrib/velocity/lib/velocity-tools-generic-3.0.jar -> contrib/velocity/lib/velocity-tools-generic-3.1.jar
- zookeeper related files (due to https://issues.apache.org/jira/browse/ZOOKEEPER-3822)
    - licenses/zookeeper-3.6.2.jar.sha1 -> licenses/zookeeper-3.5.9.jar.sha1
    - licenses/zookeeper-jute-3.6.2.jar.sha1 -> licenses/zookeeper-jute-3.5.9.jar.sha1
    - dist/solrj-lib/zookeeper-3.6.2.jar -> dist/solrj-lib/zookeeper-3.5.9.jar
    - dist/solrj-lib/zookeeper-jute-3.6.2.jar -> dist/solrj-lib/zookeeper-jute-3.5.9.jar
    - server/solr-webapp/webapp/WEB-INF/lib/zookeeper-3.6.2.jar -> server/solr-webapp/webapp/WEB-INF/lib/zookeeper-3.5.9.jar
    - server/solr-webapp/webapp/WEB-INF/lib/zookeeper-jute-3.6.2.jar -> server/solr-webapp/webapp/WEB-INF/lib/zookeeper-jute-3.5.9.jar
