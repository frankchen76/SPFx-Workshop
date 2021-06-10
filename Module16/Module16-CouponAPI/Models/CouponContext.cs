using Microsoft.EntityFrameworkCore;

namespace SPFxWorkshop.CouponAPI.Models
{
    public class CouponContext : DbContext
    {
        public CouponContext(DbContextOptions<CouponContext> options)
            : base(options)
        {
        }

        public DbSet<Coupon> Coupons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            for (int i = 0; i < 10; i++)
            {
                modelBuilder.Entity<Coupon>().HasData(new Coupon
                {
                    Id = i + 1,
                    CouponCode = $"COUPON00{i}",
                    Expiration = System.DateTime.Today.AddYears(10),
                    Owner = "frank@m365x725618.onmicrosoft.com"
                });
            }
        }
    }
}