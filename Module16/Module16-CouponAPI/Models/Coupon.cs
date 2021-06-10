using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPFxWorkshop.CouponAPI.Models
{
    public class Coupon
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string CouponCode { get; set; }
        public string Owner { get; set; }
        public DateTime Expiration { get; set; }
        public DateTime RedeemedDate { get; set; }
    }
}