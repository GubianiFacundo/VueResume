import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { SkillType } from '../enums/skill-type.enum';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column( { nullable: true })
  icon?: string;

  @Column( { nullable: true })
  image?: string;

  @Column( { nullable: true })
  link?: string;

  @Column({
    type: 'enum',
    enum: SkillType,
  })
  type: SkillType;
}