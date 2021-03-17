using System.Collections.Generic;
namespace App.Services.Repositories.Interfaces
{
    public interface IGeneralRepository<T>
    {
        void CreateEntity(T entity);
        T GetEntityById(string id);
        void DeleteEntityById(string id);
        void UpdateEntityById(string id);
        IEnumerable<T> GetAllEntities();

    }
}