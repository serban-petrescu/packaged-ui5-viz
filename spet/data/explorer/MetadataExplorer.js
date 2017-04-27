function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}sap.ui.define("spet/data/explorer/MetadataExplorer",["jquery.sap.global","sap/ui/core/Control","sap/ui/core/Component","sap/ui/model/odata/AnnotationHelper","spet/data/explorer/Graph","spet/data/explorer/KeyNode","spet/data/explorer/KeyLink"],function(e,t,a,r,d,p,o){"use strict";return t.extend("spet.data.explorer.MetadataExplorer",{metadata:{properties:{width:{type:"sap.ui.core.CSSSize",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",defaultValue:"100%"},origins:{type:"string[]",defaultValue:[]},modelName:{type:"string",defaultValue:void 0}},aggregations:{_graph:{type:"spet.data.explorer.Graph",multiple:!1,visibility:"hidden"}},events:{detail:{dom:{type:"object"},entityType:{type:"string"}}}},init:function(){var e=this;this.setAggregation("_graph",new d({directed:!1})),this.attachModelContextChange(function(){var t=e.getModelName(),r=a.getOwnerComponentFor(e),d=e.getModel(t)||r&&r.getModel(t);d&&e.build(d)})},build:function(t){var a=this,d=t&&t.getMetaModel(),s=function(e){var t=d.createBindingContext(e+"/com.sap.vocabularies.Common.v1.Label");return t&&r.format(t)||d.getProperty(e+"/name")},i=function(e){return e.namespace+"."+e.name};d.loaded().then(function(){var t,r,n=d.getProperty("/dataServices/schema")||[],u=(t=[]).concat.apply(t,_toConsumableArray(e.map(n,function(e){return e.entityType||[]}))),l=(r=[]).concat.apply(r,_toConsumableArray(e.map(n,function(e){return e.association||[]}))),x=a.getAggregation("_graph");x.removeAllNodes(),x.removeAllLinks(),e.each(u,function(e,t){return x.addNode(new p({key:i(t),label:s(d.getODataEntityType(i(t),!0))}))}),e.each(l,function(e,t){return x.addLink(new o({sourceKey:t.end[0].type,targetKey:t.end[1].type}))}),a.updateOrigins()})},setOrigins:function(e){this.setProperty("origins",e),this.updateOrigins()},updateOrigins:function(){var t=this.getOrigins()||[],a=this.getAggregation("_graph");t.length?e.each(a.getNodes()||[],function(e,a){a.setOrigin(t.indexOf(a.getKey())>=0),a.setExpanded(!1),a.setExpandable(!0)}):e.each(a.getNodes()||[],function(e,t){t.setOrigin(!0),t.setExpanded(!0),t.setExpandable(!1)})},renderer:function(e,t){e.write("<div"),e.writeControlData(t),e.addStyle("height",t.getHeight()),e.addStyle("width",t.getWidth()),e.writeStyles(),e.write(">"),e.renderControl(t.getAggregation("_graph")),e.write("</div>")}})});