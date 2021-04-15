using App.Models.Entities;
using App.Services.Repositories.Interfaces;

namespace App.Services.Repositories
{
    public class SQLColumnRepository : SQLRepositoryBase<Column>, IColumnRepository
    {
        public SQLColumnRepository(AppDbContext context)
            : base(context)
        {
        }
    }
}