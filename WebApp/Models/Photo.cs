using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Web;

namespace WebApp.Models
{
    public class Photo        
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageData { get; set; }
    }
}
