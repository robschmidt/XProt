/*
 * ModPlugins.cs
 * 
 * File description
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.1
 * @package mpimp
 * @subpackage 
 */ 
using System;

namespace mpimp.sharprot.plugins
{
	/// <summary>
	/// Description of ModPlugins.
	/// </summary>
	public class ModPlugins
	{
		public static double getMod15NX(string aa, int pos)
		{
			switch(aa) {
				case "R" : return 3.99996;
				case "H" : return 2.99997;
				case "K" : return 1.99998;
				case "N" : return 1.99998;
				case "Q" : return 1.99998;
				case "W" : return 1.99998;
				default : return 0.99999;
			}
		}
		
		
	}
}
