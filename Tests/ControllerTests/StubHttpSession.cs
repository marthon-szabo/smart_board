using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Tests
{
    public class StubHttpSession : ISession
    {
        private Dictionary<string, object> _sessionStorage = new Dictionary<string, object>();

        public object this[string name]
        {
            get { return _sessionStorage[name]; }
            set { _sessionStorage[name] = value; }
        }

        public bool IsAvailable => throw new System.NotImplementedException();

        public string Id => throw new System.NotImplementedException();

        public IEnumerable<string> Keys
        { 
            get { return _sessionStorage.Keys; }
        }

        public void Clear()
        {
            _sessionStorage.Clear();
        }

        public Task CommitAsync(CancellationToken cancellationToken = default)
        {
            throw new System.NotImplementedException();
        }

        public Task LoadAsync(CancellationToken cancellationToken = default)
        {
            throw new System.NotImplementedException();
        }

        public void Remove(string key)
        {
            _sessionStorage.Remove(key);
        }

        public void Set(string key, byte[] value)
        {
            _sessionStorage[key] = value;
        }

        public bool TryGetValue(string key, out byte[] value)
        {
            if (_sessionStorage[key] != null)
            {
                value = Encoding.ASCII.GetBytes(_sessionStorage[key].ToString());
                return true;
            }
            else
            {
                value = null;
                return false;
            }
        }
    }
}