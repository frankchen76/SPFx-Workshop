using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;
using SPFxWorkshop.CouponAPI.Models;

namespace SPFxWorkshop.CouponAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CouponController : ControllerBase
    {
        private readonly CouponContext _context;

        public CouponController(CouponContext context)
        {
            _context = context;
        }

        // GET: api/Coupon
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coupon>>> GetCoupons()
        {
            // Verify the token scope
            HttpContext.VerifyUserHasAnyAcceptedScope(new string[] { "Coupon.Read", "Coupon.ReadWrite", "Coupon.FullControl" });
            //return await _context.Coupons.Where(c => String.Compare(c.Owner, HttpContext.User.Identity.Name, true) == 0).ToListAsync();
            var result = from c in _context.Coupons
                         where c.Owner == HttpContext.User.Identity.Name
                         select c;
            return await result.ToListAsync();
        }

        // GET: api/Coupon/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Coupon>> GetCoupon(int id)
        {
            // Verify the token scope
            HttpContext.VerifyUserHasAnyAcceptedScope(new string[] { "Coupon.Read", "Coupon.ReadWrite", "Coupon.FullControl" });

            // var coupon = await _context.Coupons.FindAsync(id);
            var couponQuery = from c in _context.Coupons
                              where c.Id == id && c.Owner == HttpContext.User.Identity.Name
                              select c;
            var coupon = await couponQuery.FirstOrDefaultAsync();

            if (coupon == null)
            {
                return NotFound();
            }

            return coupon;
        }

        // PUT: api/Coupon/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCoupon(int id, Coupon coupon)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(new string[] { "Coupon.ReadWrite", "Coupon.FullControl" });

            if (id != coupon.Id)
            {
                return BadRequest();
            }

            _context.Entry(coupon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CouponExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Coupon
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Coupon>> PostCoupon(Coupon coupon)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(new string[] { "Coupon.ReadWrite", "Coupon.FullControl" });
            coupon.Owner = HttpContext.User.Identity.Name;
            _context.Coupons.Add(coupon);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCoupon", new { id = coupon.Id }, coupon);
        }

        // DELETE: api/Coupon/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoupon(int id)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(new string[] { "Coupon.FullControl" });
            // var coupon = await _context.Coupons.FindAsync(id);
            var couponQuery = from c in _context.Coupons
                              where c.Id == id && c.Owner == HttpContext.User.Identity.Name
                              select c;
            var coupon = await couponQuery.FirstOrDefaultAsync();

            if (coupon == null)
            {
                return NotFound();
            }

            _context.Coupons.Remove(coupon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CouponExists(int id)
        {
            return _context.Coupons.Any(e => e.Id == id);
        }
    }
}
