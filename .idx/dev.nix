{ pkgs }: {
  channel = "stable-23.11";
  packages = [
    pkgs.php82
    pkgs.php82Packages.composer
    pkgs.nodejs_20
  ];
  services.mysql = {
    enable = true;
    package = pkgs.mariadb;
  };
  idx.extensions = [
    # "svelte.svelte-vscode"
    # "vue.volar"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "build"
        ];
        manager = "web";
      };
    };
  };
}
