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

        public bool ValidateMe(string hashedPassword, string password)
        {
            byte[] hashBytes = Convert.FromBase64String(hashedPassword);

            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            using(var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000))
            {
                
                byte[] hash = pbkdf2.GetBytes(20);

                for (int i = 0; i < 20; i++)
                {
                    if (hashBytes[i + 16] != hash[i])
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }
                return false;
            }
        }
    }
}