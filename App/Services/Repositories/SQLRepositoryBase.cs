using System;
using System.Collections.Generic;
using System.Linq;
using App.Models.Entities;
using App.Services.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace App.Services.Repositories
{
    public abstract class SQLRepositoryBase<T> : IGeneralRepository<T> where T : class
    {
        protected readonly AppDbContext _context;

        public SQLRepositoryBase(AppDbContext context)
        {
            _context = context;
        }

        public void CreateEntity(T entity)
        {
            _context.Set<T>().Add(entity);
            this.Save();
        }

        public void DeleteEntityById(string id)
        {
            T entity = GetEntityById(id);
            _context.Set<T>().Remove(entity);
            this.Save();
        }

        public IEnumerable<T> GetAllEntities()
        {
            return _context.Set<T>().ToList();
        }

        public T GetEntityById(string id)
        {
            return _context.Set<T>().Find(id);
        }

        public void UpdateEntityById(T entity)
        {
            var updatableEntity = _context.Set<T>().Attach(entity);
            this.Update(updatableEntity);
        }

        protected virtual void Save()
        {
            _context.SaveChanges();
        }

        protected virtual void Update(EntityEntry entity)
        {
            entity.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            this.Save();
        }
    }
}