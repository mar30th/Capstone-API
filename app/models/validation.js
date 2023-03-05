function Validation() {
    this.checkEmpty = function (value, spanId, mess) {
      if (value === "") {
        document.getElementById(spanId).style.display = "block";
        document.getElementById(spanId).innerHTML = mess;
        return false;
      }
  
      document.getElementById(spanId).style.display = "none";
      document.getElementById(spanId).innerHTML = "";
      return true;
    };
  
    this.kiemTraChucVu = function (idSelect, spanId, mess) {
      if (document.getElementById(idSelect).selectedIndex !== 0) {
        document.getElementById(spanId).style.display = "none";
        document.getElementById(spanId).innerHTML = "";
        return true;
      }
  
      document.getElementById(spanId).style.display = "block";
      document.getElementById(spanId).innerHTML = mess;
      return false;
    };
  
    this.checkLongString = function (value, spanId, mess, min, max) {
      if (min <= value.length && value.length <= max) {
        document.getElementById(spanId).style.display = "none";
        document.getElementById(spanId).innerHTML = "";
        return true;
      }
  
      document.getElementById(spanId).style.display = "block";
      document.getElementById(spanId).innerHTML = mess;
      return false;
    };
  
    this.kiemTraMaNVTonTai = function (value, spanId, mess, arr) {
      var exist = false;
  
      for (var i = 0; i < arr.length; i++) {
        var nv = arr[i];
        if (nv.maNV === value) {
          exist = true;
          break;
        }
      }
  
      if (exist) {
        document.getElementById("spanId").style.display = "block";
        document.getElementById("spanId").innerHTML = mess;
        return false;
      }
  
      document.getElementById("spanId").style.display = "none";
      document.getElementById("spanId").innerHTML = "";
      return true;
    };
  }
  