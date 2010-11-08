/**
 * Spectrum.js
 * 
 * This file contains the Spectrum class which is used to draw a spectrum
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.1
 * @package mpimp.jsprot
 * @subpackage ui
*/

Ext.namespace('mpimp.jsprot.ui');

//###################################################################
/**
 * @class mpimp.jsprot.ui.Spectrum
 * The Spectrum class draws a spectrum to the specified dom element
 * @constructor
 * @param {object} config The configuration object
 */
mpimp.jsprot.ui.Spectrum = function(config)
{
	/**
	 * @cfg {Object} drawer
	 * The drawer object to use drawing the spectrum. The drawer object must have the two methods init and draw. The init method will 
	 * be called with one parameter which is the spectrum object. The draw methods will be called without parameters. All necessary data can 
	 * be retrieved from the spectrum object delivered when calling the init method.
	 */
	this.drawer = null;
	
	/**
	 * @cfg {Mixed} renderTo
	 * An element or id to render the spectrum to
	 */
	this.renderTo = null;
	
	/**
	 * @cfg {Array} spectrum
	 * The spectrum as array of objects containing properties for mass, intensity and annotation
	 */
	this.spectrum = [];
	
	/**
	 * @cfg {string} massproperty
	 * The property of an spectrum entry which stores the mass value
	 */
	this.massproperty = 'mass';
	
	/**
	 * @cfg {string} intensityproperty
	 * The property of an spectrum entry which stores the intensity value
	 */
	this.intensityproperty = 'intensity';
	
	/**
	 * @cfg {string} annotationproperty
	 * The property of an spectrum entry which stores the annotation value
	 */
	this.annotationproperty = 'annotation';
	
	Ext.apply(this, config);
	
	if (this.drawer && typeof this.drawer.init === 'function') {
		return this.drawer.init(this);
	}
	
	mpimp.jsprot.ui.Spectrum.superclass.constructor.call(this, {});
}

mpimp.jsprot.ui.Spectrum = Ext.extend(mpimp.jsprot.ui.Spectrum, mpimp.jsprot.XProtBase, {});

//###################################################################
/**
 * The method to draw the spectrum
 */
mpimp.jsprot.ui.Spectrum.prototype.draw = function()
{
	var loc = 'mpimp.jsprot.ui.Spetrum.draw';
	
	if (this.drawer && typeof this.drawer.draw === 'function') {
		return this.drawer.draw();
	} else {
		this.toLog('error', loc, 'Invalid drawer object', 'The provided drawer is not valid (missing draw function?!).', '');
	}
}
