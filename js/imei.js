const { createApp } = Vue

createApp({
    data() {
        return {
            ImeiData: [],
            key: "A5NBr-uuLnL-wPTea-hmeae-hAKwm-OfvoX",
            service: "23",
            imei: "",
            loading: false,
            ImeiTable: false,
            status: false
        }
    },
    methods: {
        async ControlLoading() 
        {
            let load = document.getElementsByClassName('loading')[0];
            if(!this.loading)
            {
                load.style.display = "flex";
                setTimeout(() => {
                    load.style.opacity = "100";
                    load.style.transform = "scale(1.0)";
                }, 300);
                this.loading = true;
            }
            else
            {
                load.style.opacity = "0";
                load.style.transform = "scale(0.9)";
                setTimeout(() => { load.style.display = "none"; }, 300);
                this.loading = false;
            }
        },

        async ControlImeiData() 
        {
            let table = document.getElementsByClassName('container-table')[0];
            if(!this.ImeiTable)
            {
                table.style.display = "flex";
                setTimeout(() => { table.style.opacity = "100"; }, 300);
                this.ImeiTable = true;
            }
            else
            {
                table.style.opacity = "0";
                setTimeout(() => { table.style.display = "none"; }, 300);
                this.ImeiTable = false;
            }
        },

        async CheckImei()
        {
            if(this.imei)
            {
                if(this.imei.length < 14 )
                {
                    alert("El imei deben ser 15 digitos.");
                }
                else
                {
                    this.ControlLoading();
                    let req = await axios.get(`https://alpha.imeicheck.com/api/php-api/create?key=${this.key}&service=${this.service}&imei=${this.imei}`);
                    this.ImeiData = await req.data.object;
                    if(req.status == 200)
                    {
                        await this.ControlLoading();
                        await this.ControlImeiData();
                    }

                    let IMEIMessage = document.getElementsByClassName('IMEIMessage')[0];
                    if(req.data.status == "failed")
                    {
                        this.status = false;
                        IMEIMessage.innerHTML = req.data.response;
                    }
                    else
                    {
                        this.status = true
                        IMEIMessage.innerHTML = "";
                    }
                }
            }
            else
            {
                alert("Favor colocar un imei");
            }
        },

        async CopyText() 
        {
            let text = `
                -Modelo: ${this.ImeiData.model}
                -IMEI: ${this.ImeiData.imei}
                -IMEI 2: ${this.ImeiData.imei2}
                -Numero de serie: ${this.ImeiData.serial}
                -Fecha de Compra: ${this.ImeiData.estPurchaseDate}
                -ID: ${this.ImeiData.nextId}
                -Operador: ${this.ImeiData.carrier}
                -Pais: ${this.ImeiData.country}
                -Bloqueo: ${this.ImeiData.simlock ? "No" : "Si"}
            `
            if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text);
                alert(`Se ha copiado el codio en el clipboard`);
            }
        }
    },
}).mount('#check')