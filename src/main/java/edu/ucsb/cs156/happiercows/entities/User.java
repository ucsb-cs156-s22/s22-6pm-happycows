package edu.ucsb.cs156.happiercows.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AccessLevel;
import lombok.Builder;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.JoinColumn;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private String email;
  private String googleSub;
  private String pictureUrl;
  private String fullName;
  private String givenName;
  private String familyName;
  private boolean emailVerified;
  private String locale;
  private String hostedDomain;
  private boolean admin;

  @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
  @JoinTable(name = "user_commons", 
    joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), 
    inverseJoinColumns = @JoinColumn(name = "commons_id", referencedColumnName = "id"))
    private List<Commons> commons;

  @Override public String toString() {
    return String.format("User: id=%d email=%s",id,email);
  }  
}
