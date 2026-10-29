/* Solo percorsi relativi: la demo funziona sia con file:// sia con HTTPS. */
window.CAM_CONFIG = {
  cameraId: 'CAM_CT_01',
  shotDuration: 4000,
  crossfade: 1000,
  shots: [
    { title: 'Coibentazione dei circuiti', short: 'Coibentazione', src: 'assets/photos/01-fine-lavori.jpg', position: '50% 43%', from: [-2, 0, 1.10], to: [2, -1, 1.14] },
    { title: 'Vista d’insieme dei circuiti', short: 'Vista d’insieme', src: 'assets/photos/02-fine-lavori.jpg', position: '50% 45%', from: [2, 0, 1.10], to: [-2, -1, 1.14] },
    { title: 'Dettaglio tubazioni coibentate', short: 'Tubazioni', src: 'assets/photos/03-fine-lavori.jpg', position: '50% 45%', from: [-2, 0, 1.10], to: [2, -1, 1.14] },
    { title: 'Quadro e unità RHOSS', short: 'Quadro RHOSS', src: 'assets/photos/04-fine-lavori.jpg', position: '50% 43%', from: [2, 0, 1.10], to: [-2, -1, 1.14] },
    { title: 'Accumulo e circuiti isolati', short: 'Accumulo', src: 'assets/photos/05-fine-lavori.jpg', position: '50% 46%', from: [-2, 0, 1.10], to: [2, -1, 1.14] },
    { title: 'Panoramica accumulo e RHOSS', short: 'Accumulo · RHOSS', src: 'assets/photos/06-fine-lavori.jpg', position: '50% 45%', from: [2, 0, 1.10], to: [-2, -1, 1.14] },
    { title: 'Serbatoio e collegamenti', short: 'Serbatoio', src: 'assets/photos/07-fine-lavori.jpg', position: '50% 44%', from: [-2, 0, 1.10], to: [2, -1, 1.14] },
    { title: 'Dettaglio serbatoio e tubazioni', short: 'Dettaglio serbatoio', src: 'assets/photos/08-fine-lavori.jpg', position: '50% 45%', from: [2, 0, 1.10], to: [-2, -1, 1.14] },
    { title: 'Serbatoio di accumulo', short: 'Accumulo', src: 'assets/photos/09-fine-lavori.jpg', position: '50% 44%', from: [-2, 0, 1.10], to: [2, -1, 1.14] }
  ]
};
