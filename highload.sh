REQUIRED_PKG="siege"

PKG_OK=$(dpkg-query -W --showformat='${Status}\n' $REQUIRED_PKG | grep "installed")

pkgStatus="not installed"
if [[ "" != "$PKG_OK" ]]
then
   pkgStatus="installed"
fi

echo Checking for $REQUIRED_PKG... "$pkgStatus"


if [ "" = "$PKG_OK" ]; then
  echo "No $REQUIRED_PKG. Setting up $REQUIRED_PKG..."
  printf "\n"
  sudo apt-get --yes install $REQUIRED_PKG
fi

printf "\nStarting highload...\n"

siege -c200 -t10s http://localhost:80
