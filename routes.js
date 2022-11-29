const express=require('express')
const routes=express.Router()

///  route for select  ------------------------------------------
routes.get('/:table',(req,res)=>{
   //res.send('Ahora si viene el sel')
   req.getConnection((err,conn)=>{
    
    if(err) return res.send(err)
    var ssql='Select * from '+req.params.table
    conn.query(ssql,(err,rows)=>{
        if(err) return res.send(err)
      

        res.json(rows)
        
           
    })
    })

})

/// route for insert -------------------------------------------
routes.post('/:table',(req,res)=>{
    //res.send('Ahora si viene el sel')
    req.getConnection((err,conn)=>{
     
     if(err) return res.send(err)

     //var ssql='INSERT INTO '+req.params.table
     //conn.query(ssql,(err,rows)=>{
     conn.query('INSERT INTO '+req.params.table +' SET ?',[req.body],(err,rows)=>{
         if(err) return res.send(err)
 
         res.send('Datos de usuario agregados exitosamente!')
     })
 
    })
 })
//// route for delete
routes.delete('/:table/:id',(req,res)=>{
    
    req.getConnection((err,conn)=>{
     
     if(err) return res.send(err)
     
     conn.query('DELETE FROM ' + req.params.table + ' WHERE usu_id = ?',[req.params.id],(err,rows)=>{
         if(err) return res.send(err)
 
         res.send('Datos de usuario eliminados')
     })
 
    })
 })

 // route for update
 routes.put('/:table/:field/:id',(req,res)=>{
    
    req.getConnection((err,conn)=>{
     
     if(err) return res.send(err)
     
     conn.query('UPDATE '+ req.params.table +' SET ? WHERE '+ req.params.field +' = ?',[req.body,req.params.id],(err,rows)=>{
         if(err) return res.send(err)
 
         res.send('Datos de usuario actualizados correctamente!')
     })
 
    })
 })


module.exports=routes // se exporta routes para que pueda ser usado en el archivo server 