using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class UserInfoDbContext : IdentityDbContext
    {
        private readonly DbContextOptions<UserInfoDbContext> _options;
        public UserInfoDbContext(DbContextOptions<UserInfoDbContext> options) : base(options)
        {
            _options = options;
        }
        
    }
}
```