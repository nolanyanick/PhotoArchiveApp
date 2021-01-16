using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using WebApp.Models;
using System.IO;
using System.Web;

namespace WebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private IWebHostEnvironment _env;

        public HomeController(ILogger<HomeController> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        } 

        public ActionResult GetData(int pageIndex, int pageSize)
        {
            //System.Threading.Thread.Sleep(1000);
            var rootDir = _env.WebRootPath;
            string[] filters = new string[]
            {
                ".jpg", ".jpeg", ".png", ".gif", ".tiff", ".bmp", ".svg"
            };

            string baseUrl = "/";

            // get image urls from wwwroot directory
            var imgUrls = Directory.EnumerateFiles(rootDir, "*.*", SearchOption.AllDirectories)
                .Where(fileName => filters.Any(filter => fileName.EndsWith(filter))) // get only files that end with filter options
                .Select(fileName => Path.GetRelativePath(rootDir, fileName)) // get relative path for files
                .Select(fileName => Path.Combine(baseUrl, fileName)) // prepend the baseUrl
                .Select(fileName => fileName.Replace("\\", "/")) // replace "\" with "/"
                .Skip(pageIndex * pageSize) // skip any files that have been used before
                .Take(pageSize); // take only a select amount of files based on pageSize

            return Json(imgUrls);
        }
    }
}
