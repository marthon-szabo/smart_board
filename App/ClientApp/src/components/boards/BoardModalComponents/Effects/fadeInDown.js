export default {
    'mask': {
        'position': 'fixed',
        'top': 0,
        'left': 0,
        'width': '100%',
        'height': '100%',
        'backgroundColor': 'rgba(0, 0, 0, 0.7)',
        'zIndex': 10001
    },
    'maskHidden': {
        'display': 'none'
    },
    'container': {
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'width': '100%',
        'height': '100%',
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center',
        'zIndex': 10000
    },
    'containerHidden': {
        'position': 'fixed',
        'top': 0,
        'left': 0,
        'width': '100%',
        'height': '100%',
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center',
        'zIndex': -1
    },
    'panel': {
        'backgroundColor': '#96dcd2',
        'borderRadius': '5px',
        'boxSizing': 'border-box',
        'boxShadow': '0 2px 4px rgba(0, 0, 0, 0.3)',
        'transition': 'transform 500ms cubic-bezier(0, 0, 0.25, 1), opacity 500ms cubic-bezier(0, 0, 0.25, 1)',
        'zIndex': 10002
    },
    'panelHidden': {
        'transform': 'translate3d(0, -100px, 0)',
        'opacity': 0,
        'zIndex': -1,
        'height': 0,
        'width': 0,
        'overflow': 'hidden'
    },
    'hamburger': {
        'boxSizing': 'border-box',
        'top': 0,
        'left': 0,
        'transition': 'transform 500ms cubic-bezier(0, 0, 0.25, 1), opacity 500ms cubic-bezier(0, 0, 0.25, 1)',
    },
    'hamburgerHidden': {
        'transform': 'translate3d(0, -100px, 0)',
        'opacity': 0,
        'zIndex': -1,
        'height': 0,
        'width': 0,
        'overflow': 'hidden'
    }
};
