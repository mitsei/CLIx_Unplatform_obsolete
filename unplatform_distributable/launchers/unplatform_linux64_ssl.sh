./unplatform/unplatform_linux64 &
sleep 6
./unplatform/unplatform_linux64_worker &
./qbank-lite-v0.0.65-ubuntu-ssl
google-chrome https://localhost:8888
