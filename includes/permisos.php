<?php

// namespace clases;

require_once(__DIR__ . '/../componentes/conexion.php');

class Permisos
{

    public static function tienePermiso($permiso, $idUsuario)
    {
        if (is_null($permiso) || is_null($idUsuario)) {
            return false;
        }
        if (!is_array($permiso)) {
            $permisos = [$permiso];
        } else {
            $permisos = $permiso;
        }
        return self::tieneAlgunPermiso($permisos, $idUsuario);
    }

    public static function tieneAlgunPermiso($permisos, $idUsuario)
    {
        /** @var \PDO $conn */
        global $conn;
        if (is_null($permisos) || !is_array($permisos) || empty($permisos) || is_null($idUsuario)) {
            return false;
        }
        $bindPermisos = implode(',', array_map(function ($p, $k) {
            return ":permiso$k";
        }, $permisos, array_keys($permisos)));
        $sql = "
            SELECT 
                1 
            FROM 
                permisos
            INNER JOIN
                roles_permisos
                    ON
                        roles_permisos.id_permiso = permisos.id
            INNER JOIN
                roles_usuarios
                    ON
                        roles_usuarios.id_rol = roles_permisos.id_rol
            WHERE 
                    roles_usuarios.id_usuario = :idUsuario 
                AND permisos.nombre IN (" . $bindPermisos . ")
            LIMIT 1;
        ";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':idUsuario', $idUsuario);
        array_walk($permisos, function ($p, $k) use ($stmt) {
            $stmt->bindValue(":permiso$k", $p);
        });
        $stmt->execute();
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        return !empty($result);
    }

    public static function getPermisos($idUsuario)
    {
        /** @var \PDO $conn */
        global $conn;
        if (is_null($idUsuario)) {
            return [];
        }
        $sql = "
            SELECT 
                permisos.nombre
            FROM 
                permisos
            INNER JOIN
                roles_permisos
                    ON
                        roles_permisos.id_permiso = permisos.id
            INNER JOIN
                roles_usuarios
                    ON
                        roles_usuarios.id_rol = roles_permisos.id_rol
            WHERE 
                roles_usuarios.id_usuario = :idUsuario;
        ";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':idUsuario', $idUsuario);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return $result;
    }

    public static function getRoles($idUsuario)
    {
        /** @var \PDO $conn */
        global $conn;
        if (is_null($idUsuario)) {
            return [];
        }
        $sql = "
            SELECT 
                roles.nombre
            FROM 
                roles
            INNER JOIN
                roles_usuarios
                    ON
                        roles_usuarios.id_rol = roles.id_rol
            WHERE 
                roles_usuarios.id_usuario = :idUsuario;
        ";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':idUsuario', $idUsuario);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return $result;
    }

    public static function esRol($rol, $idUsuario)
    {
        if (is_null($rol) || is_null($idUsuario)) {
            return false;
        }
        if (!is_array($rol)) {
            $roles = [$rol];
        } else {
            $roles = $rol;
        }
        return self::esAlgunRol($roles, $idUsuario);
    }
    public static function esAlgunRol($roles, $idUsuario)
    {
        /** @var \PDO $conn */
        global $conn;
        if (is_null($roles) || !is_array($roles) || empty($roles) || is_null($idUsuario)) {
            return false;
        }
        $bindRoles = implode(',', array_map(function ($p, $k) {
            return ":rol$k";
        }, $roles, array_keys($roles)));
        $sql = "
            SELECT 
                1 
            FROM 
                roles
            INNER JOIN
                roles_usuarios
                    ON
                        roles_usuarios.id_rol = roles.id_rol
            WHERE 
                    roles_usuarios.id_usuario = :idUsuario 
                AND roles.nombre IN (" . $bindRoles . ")
            LIMIT 1;
        ";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':idUsuario', $idUsuario);
        array_walk($roles, function ($p, $k) use ($stmt) {
            $stmt->bindValue(":rol$k", $p);
        });
        $stmt->execute();
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        return !empty($result);
    }
}
