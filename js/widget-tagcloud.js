
com=window.com||{};com.marklogic=window.com.marklogic||{};com.marklogic.widgets=window.com.marklogic.widgets||{};com.marklogic.widgets.tagcloud=function(container){this.container=container;this._config={};this.results=null;this.facet=null;this.ctx=mljs.defaultconnection.createSearchContext();this._refresh();};com.marklogic.widgets.tagcloud.getConfigurationDefinition=function(){return{};};com.marklogic.widgets.tagcloud.prototype.setConfiguration=function(config){for(var prop in config){this._config[prop]=config[prop];}
this._refresh();};com.marklogic.widgets.tagcloud.prototype.setFacet=function(f){this.facet=f;};com.marklogic.widgets.tagcloud.prototype._refresh=function(){var str="";str+="<div class='mljswidget panel panel-info widget-tagcloud'>";if(null==this.facet){str+="<p>No Facet specified. Use wgt.setFacet(name) to specify which facet to display as a tag cloud.</p>";}else{if(null!=this.results&&undefined!=this.results){if(undefined!=this.results.facets){for(var name in this.results.facets){if(this.facet==name){var values=this.results.facets[name].facetValues;bubbleSort(values,"count");var maxCount=values[0].count;var minCount=values[values.length-1].count;mljs.defaultconnection.logger.debug("maxCount: "+maxCount+", minCount: "+minCount);var startSize=10;var maxSize=20;var factor=1;if(maxCount!=minCount){factor=(maxSize-startSize)/(maxCount-minCount);}else{factor=(maxSize-startSize);}
mljs.defaultconnection.logger.debug("factor: "+factor);bubbleSort(values,"value",true);var valuesCount=values.length;for(var v=0;v<valuesCount;v++){var fv=values[v];str+="<span class='tagcloud-value' title='"+fv.name.replace(/'/g,"&#39;")+" ("+fv.count+")' style='font-size: "+(startSize+((fv.count-minCount)*factor))+"px;'>"+fv.name+"</span>";}}}}}}
str+="</div>";document.getElementById(this.container).innerHTML=str;};com.marklogic.widgets.tagcloud.prototype.setSearchContext=function(context){this.ctx=context;};com.marklogic.widgets.tagcloud.prototype.getContext=function(){return this.ctx;};com.marklogic.widgets.tagcloud.prototype.updateFacets=function(results){if("boolean"==typeof results){return;}
this.results=results;this._refresh();};