chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        
   
        let itime=[];
        let htime=[];
        let mtime=[];
        let today= new Date();
         //let start_today= today.toDateString();
         let end_today= " GMT+0530 (India Standard Time)";
        let gmtTime=today.toUTCString();
        
        let etype=[];
        //// New id added on 1/6/2020
        $('#ctl00_contentplaceholder1_gRVAttend tbody tr td:nth-child(4)').each( function(){
           etype.push( $(this).text() );       
        });
        
        $('#ctl00_contentplaceholder1_gRVAttend tbody tr td:nth-child(3)').each( function(){
           itime.push( today.toDateString()+" "+$(this).text()+end_today );       
        });
        
        if(etype[0]=='OUT')
        {
            itime.splice(0,1);
            etype.splice(0,1);
        }
        
        for(let i=etype.length-1;i>0;i--)
        {
            if(etype[i]==etype[i-1])
            {
                itime.splice(i,1);
                etype.splice(i,1);
            }
        
        }
        
        
        let k=[];
        for(let i=0;i<itime.length;i++)
        {
            let l= new Date(itime[i])
           k[i]=l.toGMTString();
        
        }
        console.log(itime)
        let sum=0;
        if(etype[etype.length-1]=='IN')
        {
            k.push(gmtTime);
        }
        else
        {
            sum=1;
        }
        
        let m=[];
        for(let i=0;i<=itime.length-sum;i++)
        {
            m[i]=k[i].slice(17);
            m[i]=m[i].substring(0,5);
        
        }
        
        
        for(let i=0;i<=itime.length-sum;i++)
        {
            htime[i]=m[i].substr(0,2);
            mtime[i]=m[i].substr(3,2);
            htime[i]=parseInt(htime[i]);
            mtime[i]=parseInt(mtime[i]);
        }
        
        
        let inMins=0;
        for(let i=0;i<htime.length-sum;i=i+2)
        {
            if(htime[i]==htime[i+1])
            {
                let diff=0;
                diff=mtime[i+1]-mtime[i];
                inMins=inMins+diff;
            }
            else
            {
                let diff=0;
                let htemp=htime[i];
                diff=diff+(60-mtime[i]);
                while(htemp!=htime[i+1])
                {
                    if(htemp==23)
                    {
                        htemp=0;
                    }
                    else
                    {
                        htemp++;
                    }
        
                    if(htemp!=htime[i+1])
                    {
                        diff=diff+60;
                    }
                    else
                    {
                        diff=diff+mtime[i+1];
                    }
                }
                inMins=inMins+diff;
            }
        }
        
let outtime=0;

for(let i=1;i<htime.length-sum-1;i=i+2)
{
    if(htime[i]==htime[i+1])
    {
        let diff=0;
        diff=mtime[i+1]-mtime[i];
        outtime=outtime+diff;
    }
    else
    {
        let diff=0;
        let htemp=htime[i];
        diff=diff+(60-mtime[i]);
        while(htemp!=htime[i+1])
        {
            if(htemp==23)
            {
                htemp=0;
            }
            else
            {
                htemp++;
            }

            if(htemp!=htime[i+1])
            {
                diff=diff+60;
            }
            else
            {
                diff=diff+mtime[i+1];
            }
        }
        outtime=outtime+diff;
    }
}



        
        let min;
        let hrs;
            hrs=parseInt(inMins/60);
        if(hrs>0)
        {
            min=parseInt(inMins%(hrs*60));
        }
        else
        {
            min=parseInt(inMins);
        }

        let omin;
        let ohrs;
        ohrs=parseInt(outtime/60);
        if(ohrs>0)
        {
            omin=parseInt(outtime%(ohrs*60));
        }
        else
        {
            omin=parseInt(outtime);
        }


let rem=540-inMins;
var add_minutes =  function (dt, minutes) {
   
    return new Date(dt.getTime() + minutes*60000);
}
let remTime=(add_minutes(today, rem).toString());

if(etype[etype.length-1]=='OUT')
{
   alert("In time : "+hrs+" hour/s and "+min+" minute/s. \nOut time : "+ohrs+" hour/s and "+omin+" minute/s. \nSay Hi to Rahul Pawar :)");
 
}
else
{
  alert("In time : "+hrs+" hour/s and "+min+" minute/s. \nOut time : "+ohrs+" hour/s and "+omin+" minute/s.\nWithout break time ends at "+remTime+" \nSay Hi to Rahul Pawar :)");
  
}

                
      //  chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
      }
    }
  );