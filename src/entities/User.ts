import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid"

@Entity("users")
class User {
    
    @PrimaryColumn()
    readonly id: string;

    // @Column("nameUser")
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    admin: boolean;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}
export { User };



// ENTIDADE < - > ORM < - > BD (users)
//              REPOSITORIOS (COMO SE FOSSE UM CONTROLLER)