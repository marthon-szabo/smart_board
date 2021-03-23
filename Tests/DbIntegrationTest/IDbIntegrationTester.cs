namespace Tests.DbIntegrationTest
{
    public interface IDbIntegrationTester
    {
         void CreateTable();
         void DropTable();
    }
}