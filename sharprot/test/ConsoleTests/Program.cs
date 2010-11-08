/*
 * ConsoleTests.cs
 * 
 * A file for testing in the console
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.1
 * @package mpimp.sharprot
 * @subpackage test
 */ 
using System;
using System.Collections;
using System.Collections.Generic;
using mpimp.sharprot.peptide;

namespace mpimp.sharprot.test
{
	class Program
	{
		public static void TestPeptide()
		{
			Peptide pep = new Peptide();
			string seq = "HGYIGEFEYVDDHR";
			Console.WriteLine("** Test validation **");
			Console.WriteLine("Peptide: "+pep.Sequence);
			if (pep.validateSequence(seq) == true) {
				Console.WriteLine("TRUE");
			} else {
				Console.WriteLine("FALSE");
			}
			
			seq = "HXGYIGEFEYVDDHR";
			Console.WriteLine("Peptide: "+seq+"");
			if (pep.validateSequence(seq) == true) {
				Console.WriteLine("TRUE");
			} else {
				Console.WriteLine("FALSE");
			}
			
			seq = "HGYIGEF4EYVDDHR";
			Console.WriteLine("Peptide: "+seq+"");
			if (pep.validateSequence(seq) == true) {
				Console.WriteLine("TRUE");
			} else {
				Console.WriteLine("FALSE");
			}
			
			seq = "HGYIGEFEYV*DDHR";
			Console.WriteLine("Peptide: "+seq+"");
			if (pep.validateSequence(seq) == true) {
				Console.WriteLine("TRUE");
			} else {
				Console.WriteLine("FALSE");
			}
			
			
			pep = new Peptide();
			pep.Sequence = "HGYIGEFEYVDDHR";
			pep.NTerminus = "H";
			pep.CTerminus = "OH";
			
			Console.WriteLine("** Testing naked peptide **");
			Console.WriteLine("Peptide: "+pep.Sequence+"");
			Console.WriteLine("N-Terminus: "+pep.NTerminus+"");
			Console.WriteLine("C-Terminus: "+pep.CTerminus+"");
			
			Console.WriteLine("*** Masses monoisotopic ***");
			Console.WriteLine("Mass C-Terminus: "+pep.getCTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+pep.getNTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Peptide mass: "+pep.getMass("monoisotopic").ToString()+"");
			Console.WriteLine("Calculated MCR 2: "+pep.getTheoreticalMCR("monoisotopic", 2).ToString()+"");
			
			Console.WriteLine("*** Masses average ***");
			Console.WriteLine("Mass C-Terminus: "+pep.getCTerminusMass("average").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+pep.getNTerminusMass("average").ToString()+"");
			Console.WriteLine("Peptide mass: "+pep.getMass("average").ToString()+"");
			Console.WriteLine("Calculated MCR 3: "+pep.getTheoreticalMCR("monoisotopic", 3).ToString()+"");
			
			
			ModifiedPeptide modpep = new ModifiedPeptide();
			modpep.Plugins.Add("mpimp.sharprot.plugins.ModPlugins");
			modpep.Sequence = "ITLLEELQEKTEEDEENKPSVIEK";
			modpep.NTerminus = "H";
			modpep.CTerminus = "OH";
			PepMod objMod1 = new PepMod(){
				accession = 21,
				index = 1
			};
			
			Console.WriteLine("** Testing phosphat modification **");
			Console.WriteLine("Peptide: "+modpep.Sequence+"");
			Console.WriteLine("N-Terminus: "+modpep.NTerminus+"");
			Console.WriteLine("C-Terminus: "+modpep.CTerminus+"");
			Console.WriteLine("Modification 1: "+objMod1.accession.ToString()+"");
			
			
			Console.WriteLine("*** Masses monoisotopic without Modifications ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("monoisotopic").ToString()+"");
			Console.WriteLine("Calculated MCR 2: "+modpep.getTheoreticalMCR("monoisotopic", 2).ToString()+"");
			
			Console.WriteLine("*** Masses average without Modifications ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("average").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("average").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("average").ToString()+"");
			Console.WriteLine("Calculated MCR 3: "+modpep.getTheoreticalMCR("monoisotopic", 3).ToString()+"");
			
			modpep.addModification(objMod1);
			
			Console.WriteLine("*** Masses monoisotopic with Phosphat - Modifications ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("monoisotopic").ToString()+"");
			Console.WriteLine("Calculated MCR 2: "+modpep.getTheoreticalMCR("monoisotopic", 2).ToString()+"");
			
			Console.WriteLine("*** Masses average with Phosphat - Modifications ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("average").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("average").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("average").ToString()+"");
			Console.WriteLine("Calculated MCR 3: "+modpep.getTheoreticalMCR("monoisotopic", 3).ToString()+"");
			
			modpep = new ModifiedPeptide();
			modpep.Plugins.Add("mpimp.sharprot.plugins.ModPlugins");
			modpep.Sequence = "ITLLEELQ";
			modpep.NTerminus = "H";
			modpep.CTerminus = "OH";
			
			Console.WriteLine("** Testing 15N Modification **");
			Console.WriteLine("Peptide: "+modpep.Sequence+"");
			Console.WriteLine("N-Terminus: "+modpep.NTerminus+"");
			Console.WriteLine("C-Terminus: "+modpep.CTerminus+"");
			Console.WriteLine("Modification X: 15N");
			
			Console.WriteLine("*** Masses monoisotopic without 15N - Modifications ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("monoisotopic").ToString()+"");
			Console.WriteLine("Calculated MCR 2: "+modpep.getTheoreticalMCR("monoisotopic", 2).ToString()+"");
			
			Console.WriteLine("*** Masses average without 15N - Modifications ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("average").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("average").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("average").ToString()+"");
			Console.WriteLine("Calculated MCR 3: "+modpep.getTheoreticalMCR("monoisotopic", 3).ToString()+"");
			
			modpep.add15NModifications();
			
			Console.WriteLine("*** Masses monoisotopic with 15N - Modifications ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("monoisotopic").ToString()+"");
			Console.WriteLine("Calculated MCR 2: "+modpep.getTheoreticalMCR("monoisotopic", 2).ToString()+"");
			
			Console.WriteLine("*** Masses average with 15N - Modifications ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("average").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("average").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("average").ToString()+"");
			Console.WriteLine("Calculated MCR 3: "+modpep.getTheoreticalMCR("monoisotopic", 3).ToString()+"");
			
			modpep = new ModifiedPeptide();
			modpep.Plugins.Add("mpimp.sharprot.plugins.ModPlugins");
			modpep.Sequence = "KDEPAEESDGDLGFGLFD";
			modpep.NTerminus = "H";
			modpep.CTerminus = "OH";
			objMod1 = new PepMod(){
				accession = 21,
				index = 7
			};			
			
			Console.WriteLine("** Testing phosphat data **");
			Console.WriteLine("Peptide: "+modpep.Sequence+"");
			Console.WriteLine("N-Terminus: "+modpep.NTerminus+"");
			Console.WriteLine("C-Terminus: "+modpep.CTerminus+"");
			Console.WriteLine("Modification 1: "+objMod1.accession.ToString()+" at "+objMod1.index.ToString()+"");
			
			Console.WriteLine("*** Masses monoisotopic without Phospho mod ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("monoisotopic").ToString()+"");
			Console.WriteLine("Calculated MCR 2: "+modpep.getTheoreticalMCR("monoisotopic", 2).ToString()+"");
			
			Console.WriteLine("*** Masses average without Phospho mod ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("average").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("average").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("average").ToString()+"");
			Console.WriteLine("Calculated MCR 3: "+modpep.getTheoreticalMCR("monoisotopic", 3).ToString()+"");
			
			modpep.addModification(objMod1);
			
			Console.WriteLine("*** Masses monoisotopic with Phospho mod ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("monoisotopic").ToString()+"");
			Console.WriteLine("Calculated MCR 2: "+modpep.getTheoreticalMCR("monoisotopic", 2).ToString()+"");
			
			Console.WriteLine("*** Masses average with Phospho mod ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("average").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("average").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("average").ToString()+"");
			Console.WriteLine("Calculated MCR 3: "+modpep.getTheoreticalMCR("monoisotopic", 3).ToString()+"");
			
			modpep = new ModifiedPeptide();
			modpep.Plugins.Add("mpimp.sharprot.plugins.ModPlugins");
			modpep.setModifiedSequence("KDEPAEE(pS)DGDLGFGLFD");
			modpep.NTerminus = "H";
			modpep.CTerminus = "OH";
			
			Console.WriteLine("** Testing phosphat data (using the modseq detector) **");
			Console.WriteLine("*** Masses monoisotopic with Phospho mod ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("monoisotopic").ToString()+"");
			Console.WriteLine("Calculated MCR 2: "+modpep.getTheoreticalMCR("monoisotopic", 2).ToString()+"");
			
			Console.WriteLine("*** Masses average with Phospho mod ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("average").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("average").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("average").ToString()+"");
			Console.WriteLine("Calculated MCR 3: "+modpep.getTheoreticalMCR("monoisotopic", 3).ToString()+"");
			
			
			Console.WriteLine("** Other tests **");
			
			pep = new Peptide();
			pep.Sequence ="LSNSGDAKVR";
			pep.NTerminus = "H";
			pep.CTerminus = "OH";
			
			Console.WriteLine("*** Test for "+pep.Sequence+" ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("monoisotopic").ToString()+"");
			Console.WriteLine("Calculated MCR 2: "+modpep.getTheoreticalMCR("monoisotopic", 2).ToString()+"");
			
			modpep = new ModifiedPeptide();
			modpep.setModifiedSequence("LSN(pS)GDAKVR");
			modpep.NTerminus = "H";
			modpep.CTerminus = "OH";
			
			Console.WriteLine("*** Test for "+modpep.Sequence+" with Phosphosite ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("monoisotopic").ToString()+"");
			Console.WriteLine("Calculated MCR 2: "+modpep.getTheoreticalMCR("monoisotopic", 2).ToString()+"");
			
			modpep = new ModifiedPeptide();
			modpep.setModifiedSequence("(pS)YTNLLDLASGNFPVMGR");
			modpep.NTerminus = "H";
			modpep.CTerminus = "OH";
			
			Console.WriteLine("*** Test for "+modpep.Sequence+" with Phosphosite ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("monoisotopic").ToString()+"");
			Console.WriteLine("Calculated MCR 2: "+modpep.getTheoreticalMCR("monoisotopic", 2).ToString()+"");
			
			modpep = new ModifiedPeptide();
			modpep.setModifiedSequence("VNIKAPGD(pS)PNTDGIK");
			modpep.NTerminus = "H";
			modpep.CTerminus = "OH";
			
			Console.WriteLine("*** Test for "+modpep.Sequence+" with Phosphosite ***");
			Console.WriteLine("Mass C-Terminus: "+modpep.getCTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Mass N-Terminus: "+modpep.getNTerminusMass("monoisotopic").ToString()+"");
			Console.WriteLine("Peptide mass: "+modpep.getMass("monoisotopic").ToString()+"");
			Console.WriteLine("Calculated MCR 2: "+modpep.getTheoreticalMCR("monoisotopic", 2).ToString()+"");
			
		}
		
		public static void TestIonCalculator()
		{
			ModifiedPeptide pep = new ModifiedPeptide();
			pep.Sequence = "KDEPAEESDGDLGFGLFD";
			pep.NTerminus = "H";
			pep.CTerminus = "OH";
			pep.addModification(new PepMod(){
				accession = 21,
				index = 7
			});
			
			string strIon = "b";
			IonCalculator ic = new IonCalculator(new Hashtable(){
             	{"peptide",pep},
             	{"maxcharge", 3},
				{"weighttype", "monoisotopic"},
				{"neutralloss", new List<string>() {"H2O", "NH3"}},
             	{"customtemplate", "mass: {mass}, charge: {charge}"}
			});
			
			Console.WriteLine("** Testing **");
			Console.WriteLine("Peptide: "+pep.Sequence+"\n");
			
			Console.WriteLine("*** Result for "+strIon+"-Ions ***");
			List<Ms2Ion> arrResult = ic.calculateIon(strIon);
			foreach (Ms2Ion o in arrResult) {
				Console.WriteLine(
					o.mass.ToString()+"\t"+
					o.ion.ToString()+
					o.index.ToString()+"\t+"+
					o.charge.ToString()+"\t"+
					o.flag+"\t"+
					o.custom+"\n"
				);
			}
			
			
			Console.WriteLine("*** Testing ***");
			Console.WriteLine("Peptide: "+pep.Sequence+"\n");
			strIon = "y";
			Console.WriteLine("*** Result for "+strIon+"-Ions ***");
			arrResult = ic.calculateIon(strIon);
			foreach (Ms2Ion o in arrResult) {
				Console.WriteLine(
					o.mass.ToString()+"\t"+
					o.ion.ToString()+
					o.index.ToString()+"\t+"+
					o.charge.ToString()+"\t"+
					o.flag+"\t"+
					o.custom+"\n"
				);
			}
		}
		
		
		public static void Main(string[] args)
		{
			TestPeptide();
			TestIonCalculator();
			
			/*
			Hashtable ht = new Hashtable() {
				{"key1", "value1"},
				{"key2", 5}
			};
			*/
			
			
			
			
			
			
			
			Console.Write("Press any key to continue . . . ");
			Console.ReadKey(true);
		}
	}
}