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

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "xadesCRLRefs",
    "xadesOCSPRefs",
    "xadesOtherRefs"
})
@XmlRootElement(name = "xades:CompleteRevocationRefs")
public class XadesCompleteRevocationRefs {

    @XmlAttribute(name = "Id")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    @XmlID
    protected String id;
    @XmlElement(name = "xades:CRLRefs")
    protected XadesCRLRefs xadesCRLRefs;
    @XmlElement(name = "xades:OCSPRefs")
    protected XadesOCSPRefs xadesOCSPRefs;
    @XmlElement(name = "xades:OtherRefs")
    protected XadesOtherRefs xadesOtherRefs;

    /**
     * Gets the value of the id property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the value of the id property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setId(String value) {
        this.id = value;
    }

    /**
     * Gets the value of the xadesCRLRefs property.
     * 
     * @return
     *     possible object is
     *     {@link XadesCRLRefs }
     *     
     */
    public XadesCRLRefs getXadesCRLRefs() {
        return xadesCRLRefs;
    }

    /**
     * Sets the value of the xadesCRLRefs property.
     * 
     * @param value
     *     allowed object is
     *     {@link XadesCRLRefs }
     *     
     */
    public void setXadesCRLRefs(XadesCRLRefs value) {
        this.xadesCRLRefs = value;
    }

    /**
     * Gets the value of the xadesOCSPRefs property.
     * 
     * @return
     *     possible object is
     *     {@link XadesOCSPRefs }
     *     
     */
    public XadesOCSPRefs getXadesOCSPRefs() {
        return xadesOCSPRefs;
    }

    /**
     * Sets the value of the xadesOCSPRefs property.
     * 
     * @param value
     *     allowed object is
     *     {@link XadesOCSPRefs }
     *     
     */
    public void setXadesOCSPRefs(XadesOCSPRefs value) {
        this.xadesOCSPRefs = value;
    }

    /**
     * Gets the value of the xadesOtherRefs property.
     * 
     * @return
     *     possible object is
     *     {@link XadesOtherRefs }
     *     
     */
    public XadesOtherRefs getXadesOtherRefs() {
        return xadesOtherRefs;
    }

    /**
     * Sets the value of the xadesOtherRefs property.
     * 
     * @param value
     *     allowed object is
     *     {@link XadesOtherRefs }
     *     
     */
    public void setXadesOtherRefs(XadesOtherRefs value) {
        this.xadesOtherRefs = value;
    }

}
