using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProtectedController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    public ProtectedController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet("user-data")]
    public async Task<IActionResult> GetUserData()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var roles = await _userManager.GetRolesAsync(user);
        return Ok(new
        {
            content = "This is protected data!",
            userRole = roles.FirstOrDefault() ?? "User"
        });
    }

    [HttpGet("admin-data")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetAdminData()
    {
        return Ok(new
        {
            content = "This is admin-only data!",
            secretInfo = "Super secret admin information"
        });
    }
} 