using System;
using System.Drawing;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace GTW_WOPR;

internal static class Program
{
    [STAThread]
    private static int Main(string[] args)
    {
        string contentRoot = ResolveContentRoot();

        // Support automated CLI verification (--verify or --headless-check)
        foreach (string arg in args)
        {
            if (string.Equals(arg, "--verify", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(arg, "--headless-check", StringComparison.OrdinalIgnoreCase))
            {
                bool hasIndex = File.Exists(Path.Combine(contentRoot, "index.html"));
                bool hasJs = File.Exists(Path.Combine(contentRoot, "game.js"));
                bool hasCss = File.Exists(Path.Combine(contentRoot, "style.css"));
                Console.WriteLine(
                    $"{{\"status\":\"OK\",\"app\":\"GTW_WOPR.exe\",\"title\":\"W.O.P.R. // GLOBAL THERMONUCLEAR WAR (NORAD 1983)\",\"contentRoot\":{ System.Text.Json.JsonSerializer.Serialize(contentRoot) },\"assetsVerified\":{(hasIndex && hasJs && hasCss).ToString().ToLowerInvariant()}}}");
                return (hasIndex && hasJs && hasCss) ? 0 : 1;
            }
        }

        ApplicationConfiguration.Initialize();
        Application.Run(new WoprMainForm(contentRoot));
        return 0;
    }

    public static string ResolveContentRoot()
    {
        string baseDir = AppContext.BaseDirectory;
        string candidateWww = Path.Combine(baseDir, "wwwroot");
        if (File.Exists(Path.Combine(candidateWww, "index.html")))
            return candidateWww;

        if (File.Exists(Path.Combine(baseDir, "index.html")))
            return baseDir;

        // Walk up to find d:\Projects\GTW\index.html during development
        DirectoryInfo? dir = new DirectoryInfo(baseDir);
        while (dir != null)
        {
            string test = Path.Combine(dir.FullName, "index.html");
            if (File.Exists(test) && File.Exists(Path.Combine(dir.FullName, "game.js")))
                return dir.FullName;
            dir = dir.Parent;
        }

        return baseDir;
    }
}

public sealed class WoprMainForm : Form
{
    private readonly string _contentRoot;
    private readonly WebView2 _webView;
    private bool _isFullscreen;
    private FormWindowState _prevWindowState = FormWindowState.Normal;
    private FormBorderStyle _prevBorderStyle = FormBorderStyle.Sizable;
    private Rectangle _prevBounds;

    [DllImport("dwmapi.dll", PreserveSig = true)]
    private static extern int DwmSetWindowAttribute(IntPtr hwnd, int attr, ref int attrValue, int attrSize);

    public WoprMainForm(string contentRoot)
    {
        _contentRoot = contentRoot;

        Text = "W.O.P.R. // GLOBAL THERMONUCLEAR WAR (NORAD 1983)";
        ClientSize = new Size(1280, 820);
        MinimumSize = new Size(960, 640);
        StartPosition = FormStartPosition.CenterScreen;
        BackColor = Color.FromArgb(2, 6, 10);
        ForeColor = Color.FromArgb(56, 248, 255);
        KeyPreview = true;

        TryEnableDarkTitleBar();

        _webView = new WebView2
        {
            Dock = DockStyle.Fill,
            DefaultBackgroundColor = Color.FromArgb(2, 6, 10)
        };
        Controls.Add(_webView);

        KeyDown += OnFormKeyDown;
        Load += async (_, _) => await InitializeWebViewAsync();
    }

    private void TryEnableDarkTitleBar()
    {
        try
        {
            int useDark = 1;
            // DWMWA_USE_IMMERSIVE_DARK_MODE = 20
            DwmSetWindowAttribute(Handle, 20, ref useDark, sizeof(int));
        }
        catch
        {
            // Ignore on older Windows versions
        }
    }

    private async Task InitializeWebViewAsync()
    {
        try
        {
            string userDataDir = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "GTW_WOPR_Steam",
                "WebView2Data");
            Directory.CreateDirectory(userDataDir);

            CoreWebView2Environment env = await CoreWebView2Environment.CreateAsync(null, userDataDir);
            await _webView.EnsureCoreWebView2Async(env);

            CoreWebView2Settings settings = _webView.CoreWebView2.Settings;
            settings.AreDefaultContextMenusEnabled = false;
            settings.IsStatusBarEnabled = false;
            settings.IsZoomControlEnabled = false;

            // Map local content directory to virtual NORAD hostname for clean offline asset loading
            _webView.CoreWebView2.SetVirtualHostNameToFolderMapping(
                "wopr.norad.local",
                _contentRoot,
                CoreWebView2HostResourceAccessKind.Allow);

            _webView.CoreWebView2.WebMessageReceived += (_, e) =>
            {
                string msg = e.TryGetWebMessageAsString();
                if (string.Equals(msg, "TOGGLE_FULLSCREEN", StringComparison.OrdinalIgnoreCase))
                {
                    ToggleFullscreen();
                }
            };

            _webView.CoreWebView2.Navigate("https://wopr.norad.local/index.html");
        }
        catch (Exception ex)
        {
            // Fallback to native file URI navigation if virtual host mapping or runtime throws
            string indexUri = new Uri(Path.Combine(_contentRoot, "index.html")).AbsoluteUri;
            try
            {
                _webView.Source = new Uri(indexUri);
            }
            catch
            {
                MessageBox.Show(
                    $"NORAD WOPR Terminal initialization notice:\n{ex.Message}\n\nIndex: {indexUri}",
                    "W.O.P.R. // NORAD 1983",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Information);
            }
        }
    }

    private void OnFormKeyDown(object? sender, KeyEventArgs e)
    {
        if (e.KeyCode == Keys.F11 || (e.Alt && e.KeyCode == Keys.Enter))
        {
            ToggleFullscreen();
            e.Handled = true;
        }
        else if (e.KeyCode == Keys.Escape && _isFullscreen)
        {
            ToggleFullscreen();
            e.Handled = true;
        }
    }

    public void ToggleFullscreen()
    {
        if (!_isFullscreen)
        {
            _prevWindowState = WindowState;
            _prevBorderStyle = FormBorderStyle;
            _prevBounds = Bounds;

            WindowState = FormWindowState.Normal;
            FormBorderStyle = FormBorderStyle.None;
            Bounds = Screen.FromControl(this).Bounds;
            _isFullscreen = true;
        }
        else
        {
            FormBorderStyle = _prevBorderStyle;
            WindowState = _prevWindowState;
            if (_prevWindowState == FormWindowState.Normal)
            {
                Bounds = _prevBounds;
            }
            _isFullscreen = false;
        }
    }
}
