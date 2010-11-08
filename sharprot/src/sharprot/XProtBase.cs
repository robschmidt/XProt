/*
 * XProtBase.cs
 * 
 * This file contains the base class to be extended by all XProt classes
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.2
 * @package mpimp.sharprot
 * @subpackage 
 */ 
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Xml;

namespace mpimp.sharprot
{
	/// <summary>
	/// The struct of an amino acid object
	/// </summary>
	public struct AminoAcid
	{
		public string id;
		public string shortcut;
		public string name;
		public double weight_monoiso;
		public double weight_ave;
	}
	
	/// <summary>
	/// The struct of an element object
	/// </summary>
	public struct Element
	{
		public string id;
		public string shortcut;
		public string name;
		public double weight_monoiso;
		public double weight_ave;
	}
	
	/// <summary>
	/// The struct of an physic object
	/// </summary>
	public struct Physic
	{
		public string id;
		public string shortcut;
		public string name;
		public double weight_monoiso;
		public double weight_ave;
	}
	
	/// <summary>
	/// The struct of a modification object
	/// </summary>
	public struct Modification
	{
		public int accession;
		public string name;
		public string description;
		public double weight_monoiso;
		public double weight_ave;
		public string mod_target;
		public string mod_type;
		public string mod_function;
	}
	
	/// <summary>
	/// The struct of a modification flag object
	/// </summary>
	public struct Modflag
	{
		public string flag;
        public string regexpattern;
        public int accession;
        public string target;
	}
	
	public struct PepMod{
		public int accession;
		public string aminoacid;
		public int index;
		public string weighttype;
	}
	
	/// <summary>
	/// The base class to be extended by all XProt classes
	/// </summary>
	public class XProtBase
	{
		public ArrayList Plugins;
		
		protected List<AminoAcid> _aa;
		protected List<Element> _el;
		protected List<Physic> _ph;
		protected List<Modification> _mod;
		protected List<Modflag> _modflag;
		
		//###################################################################
		/// <summary>
		/// Read the basic constants from xml reader
		/// </summary>
		/// <param name="r">The reader to read the contants from</param>
		/// <param name="type">The constant type</param>
		/// <returns>True if successfully read, false else</returns>
		private bool _readBasics(XmlTextReader r, string type)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			string eF = "";
			
			if (r == null) {
				this.toLog("error", loc, "Reader not valid", "The provided reader object is invalid.", "");
				return false;
			}
			
			string id = r.GetAttribute("id");
			string shortcut = r.GetAttribute("shortcut");
			string name = r.GetAttribute("name");
			string wmono = r.GetAttribute("weight_monoiso");
			string wave = r.GetAttribute("weight_ave");
			double dwmono = 0;
			double dwave = 0;
			
			//-- Validity check --
			eF += (id == null || id == "") ? "id," : "";
			eF += (shortcut == null || shortcut == "") ? "shortcut," : "";
			eF += (name == null || name == "") ? "name," : "";
			eF += (wmono == null || wmono == "") ? "wmono," : "";
			eF += (wave == null || wave == "") ? "wave," : "";
			
			if (eF != "") {
				this.toLog("error", loc, "Error in constants", "An invalid amino acid found in constants. "+
				           "These fields are missing or invalid: "+eF.Substring(0, eF.Length-1), "");
				return false;
			}
			
			try {
				dwmono = double.Parse(wmono);
				dwave = double.Parse(wave);
			} catch(System.Exception) {
				this.toLog("error", loc, "Invalid numeric values", "The values of the masses are not valid numerics.", "");
				return false;
			}
			
			if (type == "aa") {
				this._aa.Add(new AminoAcid() {
				    id = id,
	            	shortcut = shortcut,
	            	name = name,
	            	weight_monoiso = dwmono,
	            	weight_ave = dwave
				});
			}
			if (type == "el") {
				this._el.Add(new Element() {
	            	id = id,
	            	shortcut = shortcut,
	            	name = name,
	            	weight_monoiso = dwmono,
	            	weight_ave = dwave
				});
			}
			if (type == "ph") {
				this._ph.Add(new Physic() {
	            	id = id,
	            	shortcut = shortcut,
	            	name = name,
	            	weight_monoiso = dwmono,
	            	weight_ave = dwave
				});
			}

			return true;
		}
		
		//###################################################################
		/// <summary>
		/// Reading modification constants from XmlTextReader
		/// </summary>
		/// <param name="r">The XmlTextReader object to read from</param>
		/// <returns>True if successfully read, false else</returns>
		private bool _readMod(XmlTextReader r)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			string eF = "";
			
			if (r == null) {
				this.toLog("error", loc, "Reader not valid", "The provided reader object is invalid.", "");
				return false;
			}
			
			string accession = r.GetAttribute("accession");
			string name = r.GetAttribute("name");
			string description = r.GetAttribute("description");
			string weight_monoiso = r.GetAttribute("weight_monoiso");
			string weight_ave = r.GetAttribute("weight_ave");
			string mod_target = r.GetAttribute("mod_target");
			string mod_type = r.GetAttribute("mod_type");
			string mod_function = r.GetAttribute("mod_function");
			
			int iaccession = 0;
			double dwmono = 0;
			double dwave = 0;
			
			//-- Validity check --
			eF += (accession == null || accession == "") ? "accession," : "";
			eF += (name == null || name == "") ? "name," : "";
			eF += (description == null || description == "") ? "description," : "";
			eF += (weight_monoiso == null || weight_monoiso == "") ? "weight_monoiso," : "";
			eF += (weight_ave == null || weight_ave == "") ? "weight_ave," : "";
			eF += (mod_target == null || mod_target == "") ? "mod_target," : "";
			eF += (mod_type == null || mod_type == "") ? "mod_type," : "";
			
			if (eF != "") {
				this.toLog("error", loc, "Error in constants", "An invalid entry found in modifications. "+
				           "These fields are missing or invalid: "+eF.Substring(0, eF.Length-1), "");
				return false;
			}
			
			try {
				iaccession = int.Parse(accession);
				dwmono = double.Parse(weight_monoiso);
				dwave = double.Parse(weight_ave);
			} catch(System.Exception) {
				this.toLog("error", loc, "Invalid numeric values", "The values of the masses or the accession are not valid numerics.", "");
				return false;
			}
			
			this._mod.Add(new Modification(){
		    	accession = iaccession,
		    	name = name,
		    	description = description,
		    	weight_monoiso = dwmono,
		    	weight_ave = dwave,
		    	mod_target = mod_target,
		    	mod_type = mod_type,
		    	mod_function = mod_function
			});
				
			return true;
		}
		
		//###################################################################
		/// <summary>
		/// Reading modificationflag constants from XmlTextReader
		/// </summary>
		/// <param name="r">The XmlTextReader object to read from</param>
		/// <returns>True if successfully read, false else</returns>
		private bool _readModFlag(XmlTextReader r)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			string eF = "";
			
			if (r == null) {
				this.toLog("error", loc, "Reader not valid", "The provided reader object is invalid.", "");
				return false;
			}
			
			string flag = r.GetAttribute("flag");
			string regexpattern = r.GetAttribute("regexpattern");
			string accession = r.GetAttribute("accession");
			string target = r.GetAttribute("target");
			
			int iaccession = 0;
			
			//-- Validity check --
			eF += (flag == null || flag == "") ? "flag," : "";
			eF += (regexpattern == null || regexpattern == "") ? "regexpattern," : "";
			eF += (accession == null || accession == "") ? "accession," : "";
			eF += (target == null || target == "") ? "target," : "";
			
			if (eF != "") {
				this.toLog("error", loc, "Error in constants", "An invalid entry found in modificationflags. "+
				           "These fields are missing or invalid: "+eF.Substring(0, eF.Length-1), "");
				return false;
			}
			
			try {
				iaccession = int.Parse(accession);
			} catch(System.Exception) {
				this.toLog("error", loc, "Invalid numeric values", "The accession value is not a valid numeric.", "");
				return false;
			}
			
			this._modflag.Add(new Modflag() {
				flag = flag,
				regexpattern = regexpattern,
				accession = iaccession,
				target = target
            });
			
			return true;
		}
		
		//###################################################################
		/// <summary>
		/// Reading constants from constants.xml
		/// </summary>
		private void _readConstants()
		{
			XmlTextReader r = new XmlTextReader("constants.xml");
			XmlNodeType nt;			
			string n;
			string v;
			
            while (r.Read()) {
				nt = r.NodeType;
				n = r.Name.ToString();
				v = r.Value.ToString();
				
				if (nt.ToString() == "Element") {
					switch (n.ToLower()) {
						case "aminoacid" : this._readBasics(r, "aa"); break;
						case "element" : this._readBasics(r, "el"); break;
						case "physic" : this._readBasics(r, "ph"); break;
						case "modification" :this._readMod(r); break;
						case "modificationflag" : this._readModFlag(r); break;
					}
				}
            }
		}
		
		//###################################################################
		/// <summary>
		/// The class constructor
		/// </summary>
		public XProtBase()
		{
			this._aa = new List<AminoAcid>();
			this._el = new List<Element>();
			this._ph = new List<Physic>();
			this._mod = new List<Modification>();
			this._modflag = new List<Modflag>();
			
			this._readConstants();
			
			this.Plugins = new ArrayList();
		}
		
		//###################################################################
		/// <summary>
		/// Calculates the mass of the element in a chemical formula such as NH3
		/// </summary>
		/// 
		/// <example>
		/// <code>
		/// XprotBase xp = new XProtBase();
		/// float mass = xp.getFormulaMass("H2O", "average"); //Retrieves the average mass of water (H2O)
		/// </code>
		/// </example>
		/// 
		/// <param name="formula">The formula to calculate the mass of its elements</param>
		/// <param name="weighttype">The weight type to return (monoisotopic or average)</param>
		/// <returns>The molecular mass of the formulas elements or -1 on error</returns>
		public double getFormulaMass(string formula, string weighttype)
		{		
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			
			int iCheck;
			double dblElMass = 0;		//The elements mass
			double dblFormulaMass = 0;
			int intElMult = 0;			//The elements multiplier
			int intLength = 0;			//A helper var to get an elements multiplier
			string strEl = "";			//A single element in formula
			string strTemp = "";		//A helper var to get an elements multiplier
			
			if (formula == "") {
				this.toLog("error", loc, "Method error", "No formula specified to retrieve the mass of.", "");
				return -1;
			}
			
			//--- Calculate the mass for the given element ---
			dblFormulaMass = 0;
			for (int i=0,j=formula.Length; i<j; i++) {
				
				//-- Elements mass --
				strEl = formula.Substring(i, 1).ToUpper();
				dblElMass = this.getElementMass(strEl, weighttype);
				if (dblElMass == -1) {
					this.toLog("error", loc, "Method error", "Method (this.getElementMass) failed to complete successfully.", "");
					return -1;
				}
				
				//-- Calculate the elements multiplier --
				if(i+2 <= formula.Length && int.TryParse(formula.Substring(i+1, 1), out iCheck)){
					intLength = 1;
					strTemp = formula.Substring(i+intLength, 1);
					while(int.TryParse(strTemp, out iCheck) && i+intLength <= formula.Length){
						intLength++;
						strTemp = formula.Substring(i+intLength, 1);
					}
					if (!int.TryParse(formula.Substring(i+1, intLength-1), out iCheck)) {
						this.toLog("error", loc, "Not a number", "The elements ("+strEl+") multiplier is not a number: "+intElMult, "");
						return -1;
					}
					
					intElMult = int.Parse(formula.Substring(i+1, intLength-1));
					
					i += intLength-1;
				}
				else{
					intElMult = 1;
					intLength = 0;
				}
				
				
				
				dblFormulaMass += intElMult * dblElMass;
			}
			
			return dblFormulaMass;
		}
		
		//###################################################################
		/// <summary>
		/// Retrieves the mass of an amino acid specified by id or shortcut
		/// </summary>
		/// <param name="aminoacid">The aminoacids shortcut</param>
		/// <param name="weighttype">The weighttype to return the mass of</param>
		/// <returns>The amino acids mass or -1 on error</returns>
		public double getAminoAcidMass(string aminoacid, string weighttype)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			
			AminoAcid? aa = this._aa.Find(delegate(AminoAcid o) { return o.shortcut == aminoacid; });
			if (aa == null) {
				this.toLog("error", loc, "Amino acid not defined", "The amino acid "+aminoacid+" was not defined in the constants file.", "");
				return -1;
			}
		
			switch (weighttype) {
				case "monoisotopic" : return aa.Value.weight_monoiso;
				case "average" : return aa.Value.weight_ave;
				default : this.toLog("error", loc, "Unknown weighttype", "Weighttype ("+weighttype+") is unknown.", ""); return -1;
			}
		}
		
		//###################################################################
		/// <summary>
		/// Retrieves the mass of an element specified by id or shortcut
		/// </summary>
		/// <param name="element">The elements id or shortcut</param>
		/// <param name="weighttype">The weighttype to return the element mass of</param>
		/// <returns>The elements mass or -1 on error</returns>
		public double getElementMass(string element, string weighttype)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			
			Element? el = this._el.Find(delegate(Element o) { return o.shortcut == element; });
			if (el == null) {
				this.toLog("error", loc, "Element not defined", "The element "+element+" was not defined in the constants file.", "");
				return -1;
			}
			
			switch (weighttype) {
				case "monoisotopic" : return el.Value.weight_monoiso;
				case "average" : return el.Value.weight_ave;
				default : this.toLog("error", loc, "Unknown weighttype", "Weighttype ("+weighttype+") is unknown.", ""); return -1;
			}
		}
		
		//###################################################################
		/// <summary>
		/// Retrieves the mass of an physics element specified by shortcut
		/// </summary>
		/// <param name="physics">The physics elements shortcut</param>
		/// <param name="weighttype">The weighttype to return the element mass of</param>
		/// <returns>The physics mass or -1 on error</returns>
		public double getPhysicsMass(string physics, string weighttype)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			
			Physic? ph = this._ph.Find(delegate(Physic o) { return o.shortcut == physics; });
			if (ph == null) {
				this.toLog("error", loc, "Physics not defined", "The physics "+physics+" was not defined in the constants file.", "");
				return -1;
			}
			
			switch (weighttype) {
				case "monoisotopic" : return ph.Value.weight_monoiso;
				case "average" : return ph.Value.weight_ave;
				default : this.toLog("error", loc, "Unknown weighttype", "Weighttype ("+weighttype+") is unknown.", ""); return -1;
			}
		}
		
		//###################################################################
		/// <summary>
		/// Retrieves a modification object by accession
		/// </summary>
		/// <param name="accession">The accession of the modification</param>
		/// <returns>The modification object or null</returns>
		public Modification? getModification(int accession)
		{
			Modification? mod = this._mod.Find(delegate(Modification o) { return o.accession == accession; });
			if (mod == null) {
				return null;
			}
			
			return mod.Value;
		}
		
		//###################################################################
		/// <summary>
		/// Retrieves the mass of an element specified by id or shortcut
		/// </summary>
		/// <param name="accession">The accession of the modification</param>
		/// <param name="aminoacid">The modified amino acid</param>
		/// <param name="position">The position of the amino acid in sequence (zero-based index)</param>
		/// <param name="weighttype">The weighttype to return the element mass of</param>
		/// <returns>The modification mass or -1 on error</returns>
		public double getModificationMass(int accession, string aminoacid, int position, string weighttype)
		{
			string loc = MethodBase.GetCurrentMethod().DeclaringType+"/"+MethodBase.GetCurrentMethod().Name;
			bool bFound = false;
			Type t;
			MethodInfo m;
			double mass = 0;
			
			Modification? modnull = this.getModification(accession);
			if (modnull == null) {
				return -1;
			}
			Modification mod = modnull.Value;
			
			
			if (weighttype != "monoisotopic" && weighttype != "average") {
			    this.toLog("error", loc, "Unknown weighttype", "Weighttype ("+weighttype+") is unknown.", "");
			    return -1;
			}
			
			switch (mod.mod_type) {
				case "addition" :
					if (weighttype == "monoisotopic") {
							return mod.weight_monoiso;
					} else {
						return mod.weight_ave;
					}
				case "subtraction" :
					if (weighttype == "monoisotopic") {
						return mod.weight_monoiso * (-1);
					} else {
						return mod.weight_ave * (-1);
					}
				case "function" :
					foreach (string cls in this.Plugins) {
						t = Type.GetType(cls);
						if (t == null) {
							continue;
						}
						
						m = t.GetMethod(mod.mod_function);
						if (m == null) {
							continue;
						}
						
						try {
							object ret = m.Invoke(null, new object[] {aminoacid, position});
							mass = double.Parse(ret.ToString());
						} catch(Exception e) {
							this.toLog("error", loc, "Error on function call", "An error occurred calling the modification function ("+mod.mod_function+")", "");
							return -1;
						}
						
						bFound = true;
						break;
					}
					
					if (!bFound) {
						this.toLog("error", loc, "Function not found", "Modification function ("+mod.mod_function+") not found in "+
						           "provided Plugins.", "");
						return -1;
					}
					
					
					
					return mass; //not tested yet
			}
			
			return -1;
		}
		
		
		
		//###################################################################
		/// <summary>
		/// Adds an entry to the internal log
		/// </summary>
		/// <param name="type">The log type (error, message, action)</param>
		/// <param name="location">The trigger location</param>
		/// <param name="title">The title of the log entry</param>
		/// <param name="body">The body of the log entry</param>
		/// <param name="number">The id of the log entry</param>
		public void toLog(string type, string location, string title, string body, string number)
		{
			Console.WriteLine("ERROR in "+location+": "+title+" - "+body);
		}
	}
		
}
