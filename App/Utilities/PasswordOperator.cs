using System;
using System.Security.Cryptography;

namespace App.Utilities
{
    public class PasswordOperator
    {
        private PasswordOperator()
        {
            
        }

        public static string HashMe(string password)
        {
            byte[] salt;
            byte[] hashBytes;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            
            using(var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000))
            {
                byte[] hash = pbkdf2.GetBytes(20);
                hashBytes = new byte[36];

                Array.Copy(salt, 0, hashBytes, 0, 16);
                Array.Copy(hash, 0, hashBytes, 16, 20);
            }

            string hashedPassword = Convert.ToBase64String(hashBytes);
            
            return hashedPassword;
        }
    }
}