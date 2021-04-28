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

            string id = Convert.ToBase64String(salt).Replace("/", "0").Replace("=", "0");

            return id;
        }
    }
}