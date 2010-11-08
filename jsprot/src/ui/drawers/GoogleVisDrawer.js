/**
 * GoogleVisDrawer.js
 * 
 * This file contains the GoogleVisDrawer class which contains the drawing functionality for drawing spectrum using the
 * google visualization API. This class can be implemented and provided to the ui.Spectrum class.
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.1
 * @package mpimp.jsprot
 * @subpackage ui
 * <pre><code>
var specUi = new mpimp.jsprot.ui.Spectrum({
	drawer: new mpimp.jsprot.ui.spectrum.GoogleVisDrawer({
		width: 900,
		height: 400,
		colors: ['#888', '#00f'],
		legend: 'none'
	}),
	renderTo: Ext.get('spec'),
	spectrum: spectrumarray,
	annotationproperty: 'annotation'
});
objSpecUi.draw();
</code></pre>
*/

Ext.namespace('mpimp.jsprot.ui.spectrum');

//###################################################################
/**
 * @class mpimp.jsprot.ui.Spectrum
 * The Spectrum class is used to draw a spectrum
 * @constructor
 * @param {object} config The configuration object
 */
mpimp.jsprot.ui.spectrum.GoogleVisDrawer = function(config)
{
	/**
	 * @cfg {Number} width
	 * Width of the chart in pixels
	 */
	this.width = 600;
	
	/**
	 * @cfg {Number} height
	 * Height of the chart in pixels
	 */
	this.height = 300;
		
	/**
	 * @cfg {Array} colors
	 * The colors to use for the chart elements. An array of strings. Each element is a string in the format #rrggbb. For example '#00cc00'
	 */
	this.colors = ['#888', '#00f'];
	
	/**
	 * @cfg {String} legend
	 * Position and type of legend. Can be one of the following: right, left, none
	 */
	this.legend = 'none';
	
	/**
	 * @cfg {Boolean} isVertical
	 * Controls whether the bars will be vertical
	 */
	this.isVertical = false;
	
	/**
	 * @cfg {Boolean} showValueLabels
	 * If set to false, removes the labels of the values
	 */
	this.showValueLabels = true;
	
	/**
	 * @cfg {Boolean} showCategoryLabels
	 * If set to false, removes the labels of the categories.
	 */
	this.showCategoryLabels = true;
	
	/**
	 * @cfg {String} title
	 * The title to display above the spectrum
	 */
	this.title = null;
	
	Ext.apply(this, config);
	
	this.spectrum = null;
}

//###################################################################
/**
 * Initialize the drawer. This method will be called by the spectrum class.
 * @param {Object} spectrum The spectrum object using this drawer
 */
mpimp.jsprot.ui.spectrum.GoogleVisDrawer.prototype.init = function(spectrum)
{
	if (!google || !google.visualization) {
		return false;
	}
	
	this.spectrum = spectrum;
}

//###################################################################
/**
 * The function to draw the spectrum
 */
mpimp.jsprot.ui.spectrum.GoogleVisDrawer.prototype.draw = function()
{
	var strAnnot;
	var dblInt;
	var dblMass;
	
	//-- Google visualisation --
	if (!google || !google.visualization) {
		return false;
	}
	
	var arrSpectrum = this.spectrum.spectrum;

	var objDataTab = new google.visualization.DataTable();
	objDataTab.addColumn('string', 'Mass');
	objDataTab.addColumn('number', 'Intensity');
	objDataTab.addColumn('number', 'Intensity with ion annotation');
	objDataTab.addRows(arrSpectrum.length);
	
	var arrTemp;
	for (var i=0; i<arrSpectrum.length; i++) {
		strAnnot = arrSpectrum[i][this.spectrum.annotationproperty];
		dblInt = arrSpectrum[i][this.spectrum.intensityproperty];
		dblMass = arrSpectrum[i][this.spectrum.massproperty];
		
		
		if (strAnnot && strAnnot !== '') {
			objDataTab.setValue(i, 0, strAnnot+' '+String(dblMass));
			objDataTab.setValue(i, 1, 0);
			objDataTab.setValue(i, 2, dblInt);
		} else {
			objDataTab.setValue(i, 0, String(dblMass));
			objDataTab.setValue(i, 1, dblInt);
			objDataTab.setValue(i, 2, 0);
		}
	}
	
	var objChart = new google.visualization.ColumnChart(this.spectrum.renderTo);
	objChart.draw(objDataTab, this);
}

