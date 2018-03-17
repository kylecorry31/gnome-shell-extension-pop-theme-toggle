const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const Ornament = imports.ui.popupMenu.Ornament;
const Util = imports.misc.util;
const St = imports.gi.St;

function init() {}

function enable() {
    this.mainMenu = Main.panel.statusArea['aggregateMenu'].menu;

    this.themeMenu = new PopupMenu.PopupSubMenuMenuItem("Theme", true);
    this.mainMenu.addMenuItem(themeMenu, 8);
    this.themeMenu.icon.icon_name = "starred-symbolic";
    
    this.light = new PopupMenu.PopupMenuItem("Light");
    this.light.connect('activate', (item, event) => {
        this.reset_ornament();
        this.set_theme("Pop");
        item.setOrnament(Ornament.DOT);
    });
    this.themeMenu.menu.addMenuItem(this.light, 0);
    
    this.dark = new PopupMenu.PopupMenuItem("Dark");
    this.dark.connect('activate', (item, event) => {
        this.reset_ornament();
        this.set_theme("Pop-dark");
        item.setOrnament(Ornament.DOT);
    });
    this.themeMenu.menu.addMenuItem(this.dark, 1);

    this.slim_light = new PopupMenu.PopupMenuItem("Slim Light");
    this.slim_light.connect('activate', (item, event) => {
        this.reset_ornament();
        this.set_theme("Pop-slim");
        item.setOrnament(Ornament.DOT);
    });
    this.themeMenu.menu.addMenuItem(this.slim_light, 2);

    this.slim_dark = new PopupMenu.PopupMenuItem("Slim Dark");
    this.slim_dark.connect('activate', (item, event) => {
        this.reset_ornament();
        this.set_theme("Pop-dark-slim");
        item.setOrnament(Ornament.DOT);
    });
    this.themeMenu.menu.addMenuItem(this.slim_dark, 3);
    
    this.reset_ornament();
}

function set_theme(theme) {
    set_gtk_theme(theme);
    set_user_theme(theme);
    set_theme_label(theme);
}

function set_theme_label(theme){
    if(theme == "Pop") {
        this.themeMenu.label.text = "Light Theme";
    } else if (theme == "Pop-dark") {
        this.themeMenu.label.text = "Dark Theme";
    } else if (theme == "Pop-slim") {
        this.themeMenu.label.text = "Slim Light Theme";
    } else if (theme == "Pop-dark-slim") {
        this.themeMenu.label.text = "Slim Dark Theme";
    }
}

function set_gtk_theme(theme) {
    Main.setThemeStylesheet("/usr/share/themes/"+theme+"/gnome-shell/gnome-shell.css");
    Main.loadTheme();
    Util.trySpawn(["dconf", "write", "/org/gnome/shell/extensions/user-theme/name", "'" + theme +"'"]);
}

function set_user_theme(theme) {
    Util.trySpawn(["dconf", "write", "/org/gnome/desktop/interface/gtk-theme", "'" + theme +"'"]);
}

function reset_ornament() {
    this.light.setOrnament(Ornament.NONE);
    this.dark.setOrnament(Ornament.NONE);
    this.slim_light.setOrnament(Ornament.NONE);
    this.slim_dark.setOrnament(Ornament.NONE);
}

function disable() {
    if (this.light) {
        this.light.destroy();
        this.light = 0;
    }
    
    if (this.dark) {
        this.dark.destroy();
        this.dark = 0;
    }

    if (this.slim_dark) {
        this.slim_dark.destroy();
        this.slim_dark = 0;
    }

    if (this.slim_light) {
        this.slim_light.destroy();
        this.slim_light = 0;
    }

    if (this.themeMenu) {
        this.themeMenu.destroy();
        this.themeMenu = 0;
    }
}