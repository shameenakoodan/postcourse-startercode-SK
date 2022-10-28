Vagrant.configure("2") do |config|
   # Provisiing MongoDB
   config.vm.define "mongodb" do |mongodb|
     mongodb.vm.box = "spox/ubuntu-arm"
     mongodb.vm.network "private_network", ip: "192.168.56.20"
     mongodb.vm.provider "vmware_fusion" do |vb|
       config.vm.synced_folder "env/", "/home/vagrant/env" 
     end
     mongodb.vm.provision "shell", inline: <<-SHELL
       sudo systemctl disable apt-daily.service
       sudo systemctl disable apt-daily.timer
       sudo apt remove unattended-upgrades -y
      
     SHELL
     mongodb.vm.provision "shell", path: "env/mongodb/script.sh"
   end
    config.vm.define "nodeapp" do |nodeapp|
        nodeapp.vm.box = "spox/ubuntu-arm"
        nodeapp.vm.network "private_network", ip: "192.168.56.10"
        nodeapp.hostsupdater.aliases = ["nology.training"]
        #config.vm.network "forwarded_port", guest: 80, host: 1234, host_ip:"127.0.0.1"
        nodeapp.vm.provider "vmware_fusion" do |vb|
          nodeapp.vm.synced_folder "app/", "/home/vagrant/app/"
          nodeapp.vm.synced_folder "env/", "/home/vagrant/env"
          vb.gui = true
        end
        nodeapp.vm.provision "shell", inline: <<-SHELL
          systemctl disable apt-daily.service
          systemctl disable apt-daily.timer
          sudo apt remove unattended-upgrades -y
        SHELL
        nodeapp.vm.provision "shell", inline: "echo 'export DB_PATH=192.168.56.20' >> /etc/profile.d/myvars.sh", run: "always"
        nodeapp.vm.provision "shell", path: "env/nodeapp/script.sh"
      end
    end
    