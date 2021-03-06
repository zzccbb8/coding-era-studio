package com.codingera.module.base.configuration;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.codingera.module.user.service.UserService;

/**
 * using JDBC or JPA for the user detail store
 * 
 * @author Jason
 *
 */
@Configuration
class AuthenticationManagerConfiguration extends GlobalAuthenticationConfigurerAdapter {

//	@Autowired
//	private DataSource dataSource;
	@Autowired
	private UserService userService;

	@Override
	public void init(AuthenticationManagerBuilder auth) throws Exception {

		// 用户信息存在数据库
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		auth.userDetailsService(this.userService).passwordEncoder(passwordEncoder);
		
		// 写法二
		// auth.jdbcAuthentication().dataSource(this.dataSource);

	}

}