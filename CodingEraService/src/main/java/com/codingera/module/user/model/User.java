package com.codingera.module.user.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.codingera.module.base.model.NewIdEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "ce_user")
public class User extends NewIdEntity implements UserDetails, Comparable<User> {

	private static final long serialVersionUID = -192550188817193798L;

	@Column(name = "user_name", length = 20, unique = true)
	private String username;

	@Column(name = "password", length = 100)
	private String password;

	private boolean accountNonExpired;

	private boolean accountNonLocked;

	private boolean credentialsNonExpired;

	private boolean enabled;

	private String email;
	private String phone;
	private String avatar;
	private Integer sex;

	@Column(name = "intro", length = 140)
	private String intro;

	@Column(name = "display_name", length = 50)
	private String displayName;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = { CascadeType.PERSIST }, fetch = FetchType.EAGER)
	private List<UserRole> roles = new ArrayList<UserRole>();

	@Transient
	private Date lastLoginTime;

	@Transient
	private String status;

	public String getStatus() {
		if (this.isEnabled() && this.isAccountNonExpired() && this.accountNonLocked && this.credentialsNonExpired) {
			return "PASSED";
		} else if (!this.isEnabled()) {
			return "WAITING";
		}
		return "DELETED";
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Transient
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		for (UserRole userRole : this.getRoles()) {
			GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(userRole.getRole().toString());
			authorities.add(grantedAuthority);
		}

		return authorities;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
	@Override
	@JsonIgnore
	public String getPassword() {
		return password;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return accountNonExpired;
	}

	public void setAccountNonExpired(boolean accountNonExpired) {
		this.accountNonExpired = accountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return accountNonLocked;
	}

	public void setAccountNonLocked(boolean accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
	}

	public void setCredentialsNonExpired(boolean credentialsNonExpired) {
		this.credentialsNonExpired = credentialsNonExpired;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return credentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public List<UserRole> getRoles() {
		return roles;
	}

	public void setRoles(List<UserRole> roles) {
		this.roles = roles;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Integer getSex() {
		return sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public String getIntro() {
		return intro;
	}

	public void setIntro(String intro) {
		this.intro = intro;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public Date getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(Date lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	@Override
	public int compareTo(User arg0) {
		return arg0.getLastLoginTime().compareTo(this.getLastLoginTime());
	}

}
