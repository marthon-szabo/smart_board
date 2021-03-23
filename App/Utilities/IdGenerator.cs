using System;
using System.Security.Cryptography;

namespace App.Utilities
{
    public class IdGenerator
    {
        private IdGenerator()
        {
            
        }

        public static string GenerateId()
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            return Convert.ToBase64String(salt);
        }
    }
}