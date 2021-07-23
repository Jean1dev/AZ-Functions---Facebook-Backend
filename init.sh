for dir in */; do
    cd "$dir" && gnome-terminal -x sh -c "npm i && npm start; bash" && cd ..
done
