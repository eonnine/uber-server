import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
}
from 'typeorm';

import Message from './Message';
import User from './User';
import Ride from './Ride';

@Entity()
class Chat extends BaseEntity{
  @PrimaryGeneratedColumn() id: number

  @OneToMany(type => Message, message => message.chat)
  messages: Message[];

  @Column({nullable:true})
  passengerId: number;

  @Column({nullable:true})
  driverId: number;

  @ManyToOne(type => User, user => user.chatAsPassenger)
  passenger: User;

  @ManyToOne(type => User, user => user.chatAsDriver)
  driver: User;

  @OneToOne(type => Chat, chat => chat.ride, { nullable: true })
  @JoinColumn()
  ride: Ride

  @Column({nullable: true})
  rideId: number;

  @CreateDateColumn() createdAt: string;
  
  @UpdateDateColumn() updatedAt; string;

}

export default Chat;