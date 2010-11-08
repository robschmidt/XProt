/*
 * Peptide.cs
 * 
 * This file contains the peptide class which, when implemented represents a single peptide
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.1
 * @package mpimp.sharprot
 * @subpackage 
 */ 
using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using System.Text.RegularExpressions;

namespace mpimp.sharprot
{
	/// <summary>
	/// This class represents a single peptide
	/// </summary>
	public class Peptide : XProtBase
	{
		/// <summary>
		/// The peptide admino acid sequence 
		/// </summary>
		public string Sequence = "";
		
		/// <summary>
		/// The NTerminus aminoacid 
		/// </summary>
		public string NTerminus = "";
		
		/// <summary>
		/// The CTerminus aminoacid
		/// </summary>
		public string CTerminus = "";
		
		//###################################################################
		/// <summary>
		/// The class constructor 
		/// </summary>
		public Peptide() {}
		
		//###################################################################
		/// <summary>
		/// The class constructor 
		/// </summary>
		/// <param name="config">The configurations object</param>
		/// <cfg name="sequence">The sequence, the object should represent</cfg>
		/// <cfg name="nterminus">The NTerminus to use</cfg>
		/// <cfg name="cterminus">The CTerminus to use</cfg>
		public Peptide(Hashtable config)
		{
			if (config == null) {
				config = new Hashtable() {
					{"sequence", ""},
					{"nterminus", ""},
					{"cterminus", ""}
				};
			}
			
			this.Sequence = config.ContainsKey("sequence") ? config["sequence"].ToString() : "";
			this.NTerminus = config.ContainsKey("nterminus") ? config["nterminus"].ToString() : "";
			this.CTerminus = config.ContainsKey("cterminus") ? config["cterminus"].ToString() : "";
		}
		
		//###################################################################
		/// <summary>
		/// Retrieves the mass of an amino acid in sequence specified by index
		/// </summary>
		/// <param name="weighttype">The weighttype to use (monoisotopic or average)</param>
		/// <param name="index">The zero-based index of the amino acid in the sequence</param>
		/// <returns>Either the monoisotopic or the average mass of the amino acid or -1 on error</returns>
		public virtual double getIndexMass(string weighttype, int index)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			string strAa = "";
			
			if (index >= this.Sequence.Length) {
				this.toLog("error", loc, "Index out of bounds", "Specified index is out of sequence bounds.", "");
				return -1;
			}
			strAa = this.Sequence.Substring(index, 1);
			
			return this.getAminoAcidMass(strAa, weighttype);
		}
		
		//###################################################################
		/// <summary>
		/// Retrieves the theoretical mass / z 
		/// </summary>
		/// <param name="weighttype">The weighttype to use for calculation (monoisotopic or average)</param>
		/// <param name="charge">The charge (z) to use for calculation</param>
		/// <returns>The theoretical mass or -1 on error</returns>
		public double getTheoreticalMCR(string weighttype, int charge)
		{
			double dblPepMass = this.getMass(weighttype);
			return (dblPepMass+1) / charge;
		}
		
		//###################################################################
		/// <summary>
		/// Retrieves the mass of the C-Terminus 
		/// </summary>
		/// <param name="weighttype">The weighttype to use for calculation (monoisotopic or average)</param>
		/// <returns>The mass of the C-Terminus or -1 on error</returns>
		public double getCTerminusMass(string weighttype)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
		
			if (this.CTerminus != "") {
				return this.getFormulaMass(this.CTerminus, weighttype);
			}
			this.toLog("error", loc, "CTerminus not set", "Failed to calculate the CTerminus mass. CTerminus not set.", "");
			return -1;
		}
		
		//###################################################################
		/// <summary>
		/// Retrieves the calculated mass of this peptide 
		/// </summary>
		/// <param name="weighttype">The weighttype to use for calculation (monoisotopic or average)</param>
		/// <returns>The theoretical peptide mass or -1 on error</returns>
		public double getMass(string weighttype)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
		
			double dblMass = 0;
			double dblTempMass = 0;
			string strAa = "";
			
			if (this.Sequence == null || this.Sequence == "") {
				return 0;
			}
			
			//-- Terminus masses --
			if (this.NTerminus != "") {
				dblTempMass = this.getFormulaMass(this.NTerminus, weighttype);
				if (dblTempMass == -1) {
					this.toLog("error", loc, "Method error", "Method (this.getFormulaMass) failed to complete successfully for NTerminus: "+this.NTerminus, "");
					return -1;
				}
				dblMass += dblTempMass;
			}
			if (this.CTerminus != "") {
				dblTempMass = this.getFormulaMass(this.CTerminus, weighttype);
				if (dblTempMass == -1) {
					this.toLog("error", loc, "Method error", "Method (this.getFormulaMass) failed to complete successfully for CTerminus: "+this.CTerminus, "");
					return -1;
				}
				dblMass += dblTempMass;
			}
			
			//-- Amino acids --
			for (int i=0; i<this.Sequence.Length; i++) {
				strAa = this.Sequence.Substring(i,1);
				dblTempMass = this.getIndexMass(weighttype, i);
				dblMass += dblTempMass;
			}
			
			return dblMass;
		}
		
		//###################################################################
		/// <summary>
		/// Retrieves the mass of the N-Terminus 
		/// </summary>
		/// <param name="weighttype">The weighttype to use for calculation (monoisotopic or average)</param>
		/// <returns>The mass of the N-Terminus or -1 on error</returns>
		public double getNTerminusMass(string weighttype)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
		
			if (this.NTerminus != "") {
				return this.getFormulaMass(this.NTerminus, weighttype);
			}
			this.toLog("error", loc, "NTerminus not set", "Failed to calculate the NTerminus mass. NTerminus not set.", "");
			return -1;
		}
		
		//###################################################################
		/// <summary>
		/// Validates a sequnece (checks for non amino-acids and special characters)
		/// </summary>
		/// <param name="sequence">The sequence to check for validation</param>
		/// <returns>True if the sequence is valid, false else</returns>
		public bool validateSequence(string sequence)
		{
			Regex or = new Regex("[^ARNDCEQGHILKMFPSTWYV]");
			return !or.IsMatch(sequence);
		}
		
		
	}
}
