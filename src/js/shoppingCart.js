class setShopCart{
    constructor(element){
        this.ele =element;

        this.cartArr = JSON.parse(localStorage.getItem('cart'));
        this.oContent = document.querySelector('.content');
        this.oBorder =document.querySelector('.header');
    }


    init(){
        this.setCarList();
        this.setClick();
    }
    
    //生成内容
    setCarList(){
        if(this.cartArr.length === 0){
            let str =`<h1>你的男朋友已经帮助你清空了购物车，赶紧去选购把，记得还信用卡</h1>`;
            $(this.oBorder).html(str);
        }else{
            let type = 0;
            let n = 0;
            let pay = 0;
    
    
            let str = `
                        <div id="box">
                            <div class="header">
                            <button name="yes">全选</button>
                            <button name="no">不选</button>
                            <button name="not">反选</button>
                        </div>
                    `;
            str +='';
            this.cartArr.forEach(v=>{
                    if(v.buy){
                        type++;
                        n += v.num;
                        pay += v.goods_price * v.num;
                    }
    
    
                str +=`   
                        <div class="content_border">      
                            <p><img src="${v.goods_small_logo}"  alt=""></p>
                            <p>${v.goods_name}</p>
                            <p>${v.goods_price}</p>
                            <p><button name="del" goods_id=${v.goods_id} >我不要了</button></p>
                            <p>
                                <button name="jia" goods_id=${v.goods_id} ${v.num === 1 ? 'disabled' : ''}>-</button> 
                                    <strong> ${v.num} </strong>
                                <button name="jian"goods_id=${v.goods_id} ${v.num === v.goods_number ? 'disabled' : ''}>+</button>
                            </p>
                            <input type="checkbox" name="che" goods_id="${v.goods_id}" type="checkbox" ${v.buy ? 'checked' : ''}>
                        </div>
                            
                
                        `;
                })
                str += ` 
                        <div class="footer">
                            <span>您购买了${type}种商品 一共是${n}件货物</span>   
                            <span>您需要支付${pay.toFixed(2)}元人民币,快去看看余额够不够?</span>      
                        </div>
                    `;
    
            $( this.oBorder).html(str);
        }
    }
    
    //设置效果
    setClick(){
        
        this.oBorder.addEventListener('click', e=>{
            if(e.target.getAttribute('name') === 'yes'){
                this.cartArr .forEach(v=>{
                    v.buy =true;
                })
            }
    
    
            if(e.target.getAttribute('name') === 'no'){
                this.cartArr .forEach(v=>{
                    v.buy = false;
                    console.log(v.buy)
                })
            }
    
            if(e.target.getAttribute('name') === 'not'){
                this.cartArr .forEach(v=>{
                    v.buy =!(v.buy);
                })
            }
    
            if(e.target.getAttribute('name') === 'che'){
                this.cartArr .forEach(v =>{
                    if(v.goods_id === e.getAttribute('goods_id')){
                        v.buy = !(v.buy);
                        
                    }
                })
            }
            if(e.target.getAttribute('name') === 'del'){
                let bool = window.confirm('这么好的东西 真的不要了吗？');
                if(bool){
    
                    
                    this.cartArr .forEach((v,k)=>{
                        if(v.goods_id == e.target.getAttribute('goods_id')){
                            this.cartArr .splice(k,1);
                        }
                    })
                }
            }
            
    
            if(e.target.getAttribute('name') === 'jian'){
                this.cartArr .forEach(v=>{
                    if(v.goods_id == e.target.getAttribute('goods_id')){
                        v.num++
                    }
                })
            }
    
            if(e.target.getAttribute('name')==='jia'){
                this.cartArr .forEach(v=>{
                    if(v.goods_id == e.target.getAttribute('goods_id')){
                        v.num--;
                    }
                })
            }
    
            this.setCarList();
            localStorage.setItem('cart',JSON.stringify(this.cartArr));
        })
    }
}
    
       

        