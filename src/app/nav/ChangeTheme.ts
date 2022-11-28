export class ChangeTheme {
  static sendColors(valor: string): void {
    localStorage.setItem('theme', JSON.stringify(valor));
    switch (valor) {
      case 'blue':
        document.documentElement.style.setProperty('--color1', '#3c40a4');
        document.documentElement.style.setProperty('--color2', '#4d68f0');
        document.documentElement.style.setProperty('--color3', '#8697fe');
        document.documentElement.style.setProperty('--color4', '#003567');
        document.documentElement.style.setProperty('--color5', '#119e99');
        break;
      case 'red':
        document.documentElement.style.setProperty('--color1', '#a30a29');
        document.documentElement.style.setProperty('--color2', '#e21d38');
        document.documentElement.style.setProperty('--color3', '#fc5555');
        document.documentElement.style.setProperty('--color4', '#761622');
        document.documentElement.style.setProperty('--color5', '#db4900');
        break;
      case 'green':
        document.documentElement.style.setProperty('--color1', '#40A33C');
        document.documentElement.style.setProperty('--color2', '#b38f00');
        document.documentElement.style.setProperty('--color3', '#6bb300');
        document.documentElement.style.setProperty('--color4', '#356600');
        document.documentElement.style.setProperty('--color5', '#7d6400');

        break;
      case 'dark':
        document.documentElement.style.setProperty('--color1', '#4d4d4d');
        document.documentElement.style.setProperty('--color2', '#778899');
        document.documentElement.style.setProperty('--color3', '#595959');
        document.documentElement.style.setProperty('--color4', '#1a1a1a');
        document.documentElement.style.setProperty('--color5', '#0e0e0e');
        break;
    }
  }
}
