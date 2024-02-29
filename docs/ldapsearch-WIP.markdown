User Class Searches:                                                    

 1 Search User by Department:                                           
    • Filter: (department={0})                                          
 2 Search User by Description:                                          
    • Filter: (description={0})                                         
 3 Search User by Group Membership:                                     
    • Filter: (memberOf=cn={0},ou=groups,dc=example,dc=com)             
 4 Search User by sAMAccountName:                                       
    • Filter: (sAMAccountName={0})                                      
 5 Search User by Title:                                                
    • Filter: (title={0})                                               

Group Class Searches:                                                   

 1 Search Group by Description:                                         
    • Filter: (description={0})                                         
 2 Search Group by Name:                                                
    • Filter: (cn={0})                                                  
 3 Search Group by Member:                                              
    • Filter: (member=uid={0},ou=users,dc=example,dc=com)   

Device Class Searches
1 Search Device by Name:                                               
   • Filter: (&(objectClass=device)(cn={0}))                           
   • This filter searches for devices by their common name (cn).       
2 Search Device by Description:                                        
   • Filter: (&(objectClass=device)(description={0}))                  
   • This filter searches for devices by their description.            
3 Search Device by Owner:                                              
   • Filter: (&(objectClass=device)(owner={0}))                        
   • This filter searches for devices by their owner. The owner        
     attribute typically contains the DN of the user or group that owns
     the device.                                                       
4 Search Device by See Also:                                           
   • Filter: (&(objectClass=device)(seeAlso={0}))                      
   • This filter searches for devices by the "seeAlso" attribute, which
     typically contains the DN of a related object.                    
5 Search Device by Serial Number:                                      
   • Filter: (&(objectClass=device)(serialNumber={0}))                 
   • This filter searches for devices by their serial number.  
