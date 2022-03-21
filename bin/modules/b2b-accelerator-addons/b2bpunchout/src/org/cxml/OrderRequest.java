/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2016.05.12 at 07:19:30 PM EDT 
//



package org.cxml;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "orderRequestHeader",
    "itemOut"
})
@XmlRootElement(name = "OrderRequest")
public class OrderRequest {

    @XmlElement(name = "OrderRequestHeader", required = true)
    protected OrderRequestHeader orderRequestHeader;
    @XmlElement(name = "ItemOut", required = true)
    protected List<ItemOut> itemOut;

    /**
     * Gets the value of the orderRequestHeader property.
     * 
     * @return
     *     possible object is
     *     {@link OrderRequestHeader }
     *     
     */
    public OrderRequestHeader getOrderRequestHeader() {
        return orderRequestHeader;
    }

    /**
     * Sets the value of the orderRequestHeader property.
     * 
     * @param value
     *     allowed object is
     *     {@link OrderRequestHeader }
     *     
     */
    public void setOrderRequestHeader(OrderRequestHeader value) {
        this.orderRequestHeader = value;
    }

    /**
     * Gets the value of the itemOut property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the itemOut property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getItemOut().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ItemOut }
     * 
     * 
     */
    public List<ItemOut> getItemOut() {
        if (itemOut == null) {
            itemOut = new ArrayList<ItemOut>();
        }
        return this.itemOut;
    }

}
