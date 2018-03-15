const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const Ornament = imports.ui.popupMenu.Ornament;
const Util = imports.misc.util;

function init() {}

function enable() {
    
    this.powerMenu = Main.panel.statusArea['aggregateMenu']._power._item.menu;
    
    this.separator = new PopupMenu.PopupSeparatorMenuItem();
    this.powerMenu.addMenuItem(this.separator, 0);
    
    this.light = new PopupMenu.PopupMenuItem("Light");
    this.light.connect('activate', (item, event) => {
        this.reset_ornament();
        this.set_theme("light");
        item.setOrnament(Ornament.DOT);
    });
    this.powerMenu.addMenuItem(this.light, 0);
    
    this.dark = new PopupMenu.PopupMenuItem("Dark");
    this.dark.connect('activate', (item, event) => {
        this.reset_ornament();
        this.set_theme("dark");
        item.setOrnament(Ornament.DOT);
    });
    this.powerMenu.addMenuItem(this.dark, 0);
    
    this.reset_ornament();
    this.light.setOrnament(Ornament.DOT);
}

function set_theme(theme) {
    Util.trySpawn(["pop-theme-toggle", theme]);
}

function reset_ornament() {
    this.light.setOrnament(Ornament.NONE);
    this.dark.setOrnament(Ornament.NONE);
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

    if (this.separator) {
        this.separator.destroy();
        this.separator = 0;
    }
}