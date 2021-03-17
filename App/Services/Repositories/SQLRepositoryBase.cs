using System;
using App.Models.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace App.Services.Repositories
{
    public abstract class SQLRepositoryBase<T>
    {
        protected readonly AppDbContext _context;

        public SQLRepositoryBase(AppDbContext context)
        {
            _context = context;
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