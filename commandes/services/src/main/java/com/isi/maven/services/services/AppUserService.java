package com.isi.maven.services.services;

import com.isi.maven.services.dao.IAppRolesRepository;
import com.isi.maven.services.dao.IAppUserRepository;
import com.isi.maven.services.dto.AppRoles;
import com.isi.maven.services.dto.AppUser;
import com.isi.maven.services.entities.AppRolesEntity;
import com.isi.maven.services.entities.AppUserEntity;
import com.isi.maven.services.exception.EntityExistsException;
import com.isi.maven.services.exception.EntityNotFoundException;
import com.isi.maven.services.exception.RequestException;
import com.isi.maven.services.mapping.AppRolesMapper;
import com.isi.maven.services.mapping.AppUserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Service
@RequiredArgsConstructor
public class AppUserService {
    private final IAppUserRepository iAppUserRepository;
    private final IAppRolesRepository iAppRolesRepository;
    private final AppUserMapper appUserMapper;
    private final AppRolesMapper appRolesMapper;
    private final MessageSource messageSource;

    @Transactional(readOnly = true)
    public List<AppUser> getAllUsers() {
        return StreamSupport.stream(iAppUserRepository.findAll().spliterator(), false)
                .map(appUserMapper::toAppUser)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AppUser getOneUser(int id) {
        return appUserMapper.toAppUser(iAppUserRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException(messageSource.getMessage("user.notfound", new Object[]{id},
                                Locale.getDefault()))));
    }

    @Transactional
    public AppUser createAppUser(AppUser appUser) {
        if (iAppUserRepository.findByEmail(appUser.getEmail()).isPresent()) {
            throw new EntityExistsException(
                    messageSource.getMessage("user.exists",
                            new Object[]{appUser.getEmail()},
                            Locale.getDefault())
            );
        }
        List<AppRolesEntity> roles = new ArrayList<>();
        for (AppRoles roleDto : appUser.getAppRoleEntities()) {
            AppRolesEntity role = iAppRolesRepository.findById(roleDto.getId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            messageSource.getMessage("role.notfound", new Object[]{roleDto.getId()}, Locale.getDefault())));
            roles.add(role);
        }
        appUser.setAppRoleEntities(appRolesMapper.toAppRolesList(roles));

        AppUserEntity savedUser = iAppUserRepository.save(appUserMapper.fromAppUser(appUser));

        return appUserMapper.toAppUser(savedUser);
    }

    @Transactional
    public AppUser updateAppUser(int id, AppUser appUser) {
        return iAppUserRepository.findById(id)
                .map(entity -> {
                    appUser.setId(id);
                    return appUserMapper.toAppUser(
                            iAppUserRepository.save(appUserMapper.fromAppUser(appUser)));
                }).orElseThrow(() -> new EntityNotFoundException(messageSource.getMessage("user.notfound", new Object[]{id},
                        Locale.getDefault())));
    }

    @Transactional
    public void deleteAppUser(int id) {
        getOneUser(id);
        try {
            iAppUserRepository.deleteById(id);
        } catch (Exception e) {
            throw new RequestException(messageSource.getMessage("user.errordeletion", new Object[]{id},
                    Locale.getDefault()),
                    HttpStatus.CONFLICT);
        }
    }
}
